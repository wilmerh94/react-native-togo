import { createContext, useContext, useEffect, useState } from 'react';

import {
  restaurantsRequest,
  restaurantsTransform
} from './restaurants.service';

import { LocationContext } from '../location/location.context';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = async (loc) => {
    setIsLoading(true);
    setRestaurants([]);

    try {
      const restaurantsService = await restaurantsRequest(loc);
      const restaurantsReady = restaurantsTransform(restaurantsService);
      setError(null);
      setIsLoading(false);
      setRestaurants(restaurantsReady);
    } catch (err) {
      console.log(err.message);

      setIsLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
