import { useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Alert, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import { cardTokenRequest } from '../../../services/checkout/checkout.service';
import {
  CardFields,
  CardInputStyles,
  CheckoutInput,
  PayButton,
  SwitchRow,
  SwitchText
} from './checkout.styles';
const API_URL = 'exp://192.168.0.53:19000';
export const CreditCard = ({ name, email, onSuccess }) => {
  const { createToken } = useStripe();
  const [saveCard, setSaveCard] = useState(false);

  const [formDetails, setFormDetails] = useState();
  const [isComplete, setComplete] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        currency: 'usd',
        items: ['id-1']
        // request_three_d_secure: 'any',
      })
    });
    // const { paymentIntent, ephemeralKey, customer } = await response.json();
    const { clientSecret } = await response.json();

    return {
      clientSecret
      // paymentIntent,
      // ephemeralKey,
      // customer
    };
  };

  const handlePayPress = async (props) => {
    console.log(props);
    // 1. fetch Intent Client Secret from backend
    const clientSecret = await fetchPaymentIntentClientSecret();

    // 2. Gather customer billing information (ex. email)
    const billingDetails = {
      email: 'email@stripe.com',
      phone: '+48888000888',
      address: {
        city: 'Houston',
        country: 'US',
        line1: '1459  Circle Drive',
        line2: 'Texas',
        postalCode: '77063'
      }
    }; // mocked data for tests

    // 3. Confirm payment with card details
    // The rest will be done automatically using webhooks
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: { billingDetails }
    });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      console.log('Payment confirmation error', error.message);
    } else if (paymentIntent) {
      Alert.alert(
        'Success',
        `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
      );
      console.log('Success from promise', paymentIntent);
    }
  };

  return (
    <>
      <CardFields
        placeholders={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM/YY'
        }}
        cardStyle={CardInputStyles}
        onFormComplete={async (cardDetails) => {
          console.log(cardDetails);
          if (cardDetails.complete) {
            const card = {
              number: cardDetails.last4,
              exp_month: cardDetails.expiryMonth,
              exp_year: cardDetails.expiryYear
            };
            const info = await cardTokenRequest('Card');
            console.log(info, 'info');
            if (info.token) {
              onSuccess(info);
              setComplete(cardDetails.complete);
              setFormDetails(cardDetails);
            }
          }
        }}
        defaultValues={{
          countryCode: 'US'
        }}
      />
      <SwitchRow>
        <Switch
          onValueChange={(value) => setSaveCard(value)}
          value={saveCard}
        />
        <SwitchText>Save card during payment</SwitchText>
      </SwitchRow>
      <PayButton
        title="Pay Now"
        onPress={() => cardTokenRequest('Card', createToken)}
        // onPress={handlePayPress}
        accessibilityLabel="Pay"
        disabled={isComplete}
        loading={loading}
      >
        <Text>Pay</Text>
      </PayButton>
    </>
  );
};
