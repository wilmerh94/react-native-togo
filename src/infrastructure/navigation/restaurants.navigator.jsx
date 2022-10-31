import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurants-details.screen";
import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";

const RestaurantStack = createNativeStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        // ...TransitionPresets.ModalPresentationIOS,
        headerShown: false,
      }}
    >
      <RestaurantStack.Screen name="Restaurant" component={RestaurantsScreen} />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};
