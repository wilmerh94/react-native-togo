import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }

    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  const add = (item, rst) => {
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      //  Multiple options
      setCart([...cart, item]);
    }
  };

  //!TODO
  //   const remove = (item) => {
  //     cart.filter((i) => item.id !== i.id).forEach((i) => setCart(i));
  //   };

  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{ addToCart: add, clearCart: clear, restaurant, cart, sum }}
    >
      {children}
    </CartContext.Provider>
  );
};
