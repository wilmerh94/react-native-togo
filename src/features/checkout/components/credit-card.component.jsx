import { useConfirmPayment } from '@stripe/stripe-react-native';
import { useState } from 'react';
import { Alert, Text } from 'react-native';
import {
  CardFields,
  CardInputStyles,
  CheckoutInput,
  PayButton
} from './checkout.styles';
const API_URL = 'exp://192.168.0.53:19000';

export const CreditCard = () => {
  const [isComplete, setComplete] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer
    };
  };

  const handlePayPress = async () => {
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
      <CheckoutInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        // onChange={(value) => setEmail(value.nativeEvent.text)}
      />
      <CardFields
        placeholders={{
          number: '4242 4242 4242 4242',
          postalCode: '12345',
          cvc: 'CVC',
          expiration: 'MM/YY'
        }}
        autofocus
        cardStyle={CardInputStyles}
        onFormComplete={(cardDetails) => {
          console.log(cardDetails);
          setComplete(cardDetails.complete);
        }}
        defaultValues={{
          countryCode: 'US'
        }}
      />
      <PayButton
        title="Pay Now"
        onPress={handlePayPress}
        accessibilityLabel="Pay"
        disabled={!isComplete}
        loading={loading}
      >
        <Text>Pay</Text>
      </PayButton>
    </>
  );
};
