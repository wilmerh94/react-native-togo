import { FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../../../infrastructure/theme/colors';

export const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16, paddingTop: 0 }
})``;

export const OrderButton = styled(Button).attrs({
  buttonColor: colors.brand.primary
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;
