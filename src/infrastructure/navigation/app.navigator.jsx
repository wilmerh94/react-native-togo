// Packages
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// Navigators
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
// Screens
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { MapScreen } from "../../features/map/screens/map.screen";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";

//----------------------------------------------------------------
// Creating the tab navigation
const Tab = createBottomTabNavigator();
// Adding icons that I will use
const TAB_ICON = {
  Restaurants: "md-restaurant-sharp",
  Checkout: "md-cart",
  Map: "md-map",
  Settings: "md-settings",
};
//----------------------------------------------------------------
// Creating Components to be able to use icons, sizes and color when they are activated
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

//----------------------------------------------------------------import { NavigationContainer } from "@react-navigation/native";

export const AppNavigator = () => {
  return (
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
  );
};
