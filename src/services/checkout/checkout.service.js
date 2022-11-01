import { createToken } from '@stripe/stripe-react-native';
import { Alert } from 'react-native';
import { host } from '../../utils/env';

// Create Token
export const cardTokenRequest = async (type) => {
  const { error, token } = await createToken(buildTestTokenParams(type));
  console.log(token);
  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
    console.log(`Error: ${JSON.stringify(error)}`);
  } else if (token) {
    Alert.alert(
      'Success',
      `The token was created successfully! token: ${token.id}`
    );
  }
  return {
    error,
    token
  };
};

const buildTestTokenParams = (type) => {
  switch (type) {
    case 'Pii':
      return {
        type: 'Pii',
        personalId: '000000000'
      };
    case 'Card':
      return {
        type: 'Card',
        name: 'David Wallace',
        currency: 'eur'
      };
    case 'BankAccount':
      return {
        type: 'BankAccount',
        accountNumber: '000123456789',
        routingNumber: '110000000', // Routing number is REQUIRED for US bank accounts
        country: 'US',
        currency: 'usd'
      };
    default:
      throw new Error(`Unsupported token type`);
  }
};

export const payRequest = (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount
    }),
    method: 'POST'
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject('something went wrong processing your payment');
    }
    return res.json();
  });
};
