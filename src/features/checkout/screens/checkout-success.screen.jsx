import styled from 'styled-components/native';
import {
  CartIcon,
  CartIconContainer,
  CheckoutInput,
  ClearButton,
  NameInput,
  PayButton,
  PaymentProcessing
} from '../components/checkout.styles';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utility/safe-area.component';

export const CheckoutSuccessScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <Text variant="label">Success!</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
