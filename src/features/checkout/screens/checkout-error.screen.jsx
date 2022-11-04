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
import { colors } from '../../../infrastructure/theme/colors';

export const CheckoutErrorScreen = ({ route }) => {
  const { error = '' } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <Text variant="label">{error}!</Text>
      </CartIconContainer>
    </SafeArea>
  );
};
