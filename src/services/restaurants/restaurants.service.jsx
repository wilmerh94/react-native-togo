import camelize from 'camelize';
import { host, isMock } from '../../utils/env';
import axios from 'axios';

export const restaurantsRequest = async (location) => {
  const url = `${host}/placesNearby?location=${location}&mock=${isMock}`;

  const response = await axios.get(url);

  return response.data;
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY'
    };
  });

  return camelize(mappedResults);
};
