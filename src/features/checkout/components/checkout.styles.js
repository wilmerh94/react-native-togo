import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';

import {
  ActivityIndicator,
  Avatar,
  Button,
  MD3Colors,
  TextInput
} from 'react-native-paper';
import { Platform, Text } from 'react-native';
import { CardForm } from '@stripe/stripe-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};
`;
export const CheckoutInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};

  border-border-color: gray;
  border-bottom-width: 1.5px;
`;

export const CardInputStyles = {
  backgroundColor: '#f2f2f2f2',
  textColor: '#A020F0',
  borderColor: '#000000',
  borderWidth: 2,
  borderRadius: 10,
  cursorColor: '#000000',
  fontSize: 16,
  fontFamily: 'Macondo-Regular',
  placeholderColor: '#A020F0',
  textErrorColor: '#ff0000'
};

export const CardFields = styled(CardForm).attrs({
  ...Platform.select({
    ios: {
      height: 250
    },
    android: {
      height: 260
    }
  })
})`
  flex: 1;
  width: 100%;
  flex-direction: column;
  margin-top: 30px;
  margin-vertical: 30px;
`;

export const SwitchRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const SwitchText = styled(Text)`
  margin-left: 12px;
`;
export const PayButton = styled(Button).attrs({
  buttonColor: colors.brand.primary
})`
  align-self: center;
  width: 80%;
  padding: ${(props) => props.theme.space[2]};
`;
export const ClearButton = styled(Button).attrs({
  buttonColor: colors.ui.error
})`
  align-self: center;
  width: 80%;
  padding: ${(props) => props.theme.space[2]};
`;

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({ size: 128 })`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const CheckoutTitle = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;
export const CheckoutSection = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: MD3Colors.primary30
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;
`;

export const CheckoutContainer = styled.ScrollView`
background-color: ${(props) => props.theme.colors.ui.tertiary},
padding-top: 20,
padding-horizontal: 16
`;

export const AbsoluteFill = styled.ActivityIndicator`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

// const inputStyles = {
//   backgroundColor: '#D3D3D3',
//   textColor: '#A020F0',
//   borderColor: '#000000',
//   borderWidth: 2,
//   borderRadius: 10,
//   cursorColor: '#000000',
//   fontSize: 16,
//   fontFamily: 'Macondo-Regular',
//   placeholderColor: '#A020F0',
//   textErrorColor: '#ff0000'
// };

// borderWidth: 4,
// borderColor: '#A020F0',
// borderRadius: 10,
// textColor: '#0000ff',
// placeholderColor: '#FFC0CB',
// textErrorColor: 'red',
// cursorColor: '#ffff00',

// backgroundColor: '#D3D3D3',
// textColor: '#A020F0',
// borderColor: '#000000',
// borderWidth: 2,
// borderRadius: 10,
// cursorColor: '#000000',
// fontSize: 16,
// fontFamily: 'Macondo-Regular',
// placeholderColor: '#A020F0',
// textErrorColor: '#ff0000',

// borderWidth: 1,
// backgroundColor: '#FFFFFF',
// borderColor: '#000000',
// borderRadius: 8,
// fontSize: 14,
// fontFamily: 'Macondo-Regular',
// placeholderColor: '#A020F0',
// textColor: '#0000ff'
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingTop: 20,
//     paddingHorizontal: 8
//     // marginTop: 100
//   },
//   title: {
//     fontWeight: '600',
//     marginBottom: 12
//   },
//   section: {
//     marginVertical: 30
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   text: {
//     marginLeft: 12
//   },
//   form: {
//     width: '100%',
//     height: 400
//   }
// });
