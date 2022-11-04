import { createToken } from '@stripe/stripe-react-native';
import { Alert } from 'react-native';
import { host } from '../../utils/env';

// Create Token
export const cardTokenRequest = async (card) => {
  const { error, token } = await createToken(buildTestTokenParams(card));
  // console.log(token);
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

const buildTestTokenParams = (card) => {
  switch (card.type) {
    case 'Card':
      return {
        type: 'Card',
        name: card.name,
        exp_month: card.exp_month,
        exp_year: card.exp_year,
        currency: 'USD'
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

export const payRequest = async (token, amount, name) => {
  console.log(token, amount, name, 'payRequest');
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
