import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { MapRestaurantDetailScreen } from '../../features/map/screens/map-restaurant-detail.screen';
import { MapScreen } from '../../features/map/screens/map.screen';

const MapStack = createStackNavigator();

export default function MapNavigator() {
  return (
    <MapStack.Navigator
      headerShown="false"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        headerShown: false
      }}
    >
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen
        name="MapRestaurantDetail"
        component={MapRestaurantDetailScreen}
      />
    </MapStack.Navigator>
  );
}
