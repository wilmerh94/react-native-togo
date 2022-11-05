import { StripeProvider } from '@stripe/stripe-react-native';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { CartContext } from '../../../services/cart/cart.context';
import {
  cardTokenRequest,
  payRequest
} from '../../../services/checkout/checkout.service';
import { RestaurantInfoCard } from '../../restaurants/components/restaurants-info-card.components';
import {
  CartIcon,
  CartIconContainer,
  CheckoutInput,
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing
} from '../components/checkout.styles';
import { CreditCard } from '../components/credit-card.component';
export const CheckoutScreen = ({ navigation }) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPay = async () => {
    setIsLoading(true);
    if (!card || !card.complete) {
      setIsLoading(false);
      navigation.navigate('CheckoutError', {
        error: 'Please fill in a valid credit card'
      });
      console.log('error');
      return;
    }
    const { token } = await cardTokenRequest(card);
    if (token) {
      console.log(token.id, sum, name, 'CARD');
      try {
        const result = await payRequest(token.id, sum, name);
        setIsLoading(false);
        clearCart();
        navigation.navigate('CheckoutSuccess');
        console.log(result);
      } catch (error) {
        navigation.navigate('CheckoutError', {
          error
        });

        setIsLoading(false);
      }
    }
  };

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text variant="caption">Your Cart is Empty</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <StripeProvider
      publishableKey="pk_test_51Lz2ItCMTW4USIzXNKl1ryI840OxVI5MqMLHPjdEwKYTr22vuOwC5NSjDWFXLWmzseY7eO8NcBOJtyGqMH1Hon8T00JN47dH8C"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.stripe.react.native"
    >
      <SafeArea>
        <RestaurantInfoCard restaurant={restaurant} />
        <Spacer size="medium" />
        {isLoading && <PaymentProcessing />}
        <ScrollView
          accessibilityLabel="payment-screen"
          style={styles.container}
          keyboardShouldPersistTaps="always"
        >
          <Spacer position="left" size="medium">
            <Spacer position="top" size="large">
              <Text variant="body">Your Order</Text>
            </Spacer>
            <List.Section>
              {cart.map(({ item, price }, i) => (
                <List.Item
                  title={`${item} - ${price / 100}`}
                  key={`${item} - ${i}`}
                />
              ))}
            </List.Section>
            <Text variant="body">Total: {sum / 100}</Text>
          </Spacer>
          <Spacer size="medium" />
          <Divider bold />
          <NameInput
            label="Name"
            value={name}
            autoCapitalize="none"
            placeholder="Name"
            keyboardType="text"
            onChange={(value) => setName(value.nativeEvent.text)}
          />
          <CheckoutInput
            autoCapitalize="none"
            placeholder="E-mail"
            keyboardType="email-address"
            onChange={(value) => setEmail(value.nativeEvent.text)}
          />
          <Spacer position="top" size="large">
            {name && (
              <CreditCard
                name={name}
                onSuccess={setCard}
                onError={() =>
                  navigation.navigate('CheckoutError', {
                    error: 'Something went wrong processing your credit card'
                  })
                }
              />
            )}
          </Spacer>
          <Spacer position="top" size="xxl" />
          <PayButton
            icon="currency-usd"
            mode="contained"
            onPress={onPay}
            disabled={isLoading}
            // onPress={handlePayPress}
            accessibilityLabel="Pay"
          >
            Pay Now
          </PayButton>
          <Spacer position="top" size="large">
            <ClearButton
              disabled={isLoading}
              icon="cart-off"
              mode="contained"
              onPress={clearCart}
              accessibilityLabel="Clear"
            >
              Clear Now
            </ClearButton>
          </Spacer>
          <Spacer position="bottom" size="xxl" />
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
