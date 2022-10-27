import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CheckoutScreen } from "../../features/checkout/screen/checkout.screen";

import { MapScreen } from "../../features/map/screens/map.screen";

import { FavoriteContextProvider } from "../../services/favorites/favorites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import RestaurantsNavigator from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Checkout: "md-cart",
  Map: "md-map",
  Settings: "md-settings",
};

export const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ color, size }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  };
};

export const AppNavigator = () => {
  return (
    <FavoriteContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen
              name="Restaurants"
              component={RestaurantsNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsNavigator}
              options={{
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoriteContextProvider>
  );
};
