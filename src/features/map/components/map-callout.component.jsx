import { CompactRestaurantInfo } from '../../../components/restaurants/compact-restaurant-info.component';

export const MapCallout = ({ restaurant }) => {
  return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};
