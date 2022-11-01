import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch } from 'react-native';
import { Text } from 'react-native-paper';

import { SafeArea } from '../../../components/utility/safe-area.component';
import {
  PayButton,
  SwitchRow,
  SwitchText
} from '../components/checkout.styles';
import { CreditCard } from '../components/credit-card.component';
export const CheckoutScreen = () => {
  // const [saveCard, setSaveCard] = useState(false);
  // const [email, setEmail] = useState('');

  // const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
  //   useStripe();
  // const [loading, setLoading] = useState(true);
  // const [paymentMethod, setPaymentMethod] = useState({
  //   image: '',
  //   label: ''
  // });

  // const initializePaymentSheet = async () => {
  //   const { paymentIntent, ephemeralKey, customer } =
  //     await fetchPaymentSheetParams();

  //   const { error, paymentOption } = await initPaymentSheet({
  //     customerId: customer,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     paymentIntentClientSecret: paymentIntent,
  //     customFlow: true,
  //     merchantDisplayName: 'Example Inc.',
  //     style: 'alwaysDark'
  //   });
  //   setLoading(false);
  //   if (!error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   }
  //   updateButtons(paymentOption);
  // };

  // const updateButtons = (paymentOption) => {
  //   if (paymentOption) {
  //     setPaymentMethod({
  //       label: paymentOption.label,
  //       image: paymentOption.image
  //     });
  //   } else {
  //     setPaymentMethod(null);
  //   }
  // };

  // const choosePaymentOption = async () => {
  //   const { error, paymentOption } = await presentPaymentSheet({
  //     confirmPayment: false
  //   });

  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   }
  //   updateButtons(paymentOption);
  // };

  // const onPressBuy = async () => {
  //   const { error } = await confirmPaymentSheetPayment();

  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     Alert.alert('Success', 'Your order is confirmed!');
  //   }
  // };
  // useEffect(() => {
  //   initializePaymentSheet();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <StripeProvider
      publishableKey="pk_test_51Lz2ItCMTW4USIzXNKl1ryI840OxVI5MqMLHPjdEwKYTr22vuOwC5NSjDWFXLWmzseY7eO8NcBOJtyGqMH1Hon8T00JN47dH8C"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.stripe.react.native"
    >
      <SafeArea>
        <ScrollView
          accessibilityLabel="payment-screen"
          style={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <CreditCard />

          <SwitchRow>
            <Switch
            // onValueChange={(value) => setSaveCard(value)}
            // value={saveCard}
            />
            <SwitchText>Save card during payment</SwitchText>
          </SwitchRow>
          <PayButton title="Pay Now">
            <Text>Pay</Text>
          </PayButton>
        </ScrollView>
      </SafeArea>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 8
    // marginTop: 100
  }
});
