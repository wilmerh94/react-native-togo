// Packages
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Navigators
import { RestaurantsNavigator } from './restaurants.navigator';
import { SettingsNavigator } from './settings.navigator';
// Screens
import { CartContextProvider } from '../../services/cart/cart.context';
import { FavoriteContextProvider } from '../../services/favorites/favorites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { CheckoutNavigator } from './checkout.navigator';
import MapNavigator from './map.navigator';

//----------------------------------------------------------------
// Creating the tab navigation
const Tab = createBottomTabNavigator();
// Adding icons that I will use
const TAB_ICON = {
  Restaurants: 'silverware-clean',
  Checkouts: 'cart',
  Maps: 'map-search',
  Settings: 'account-cog'
};
//----------------------------------------------------------------
// Creating Components to be able to use icons, sizes and color when they are activated
export const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name={iconName} size={size} color={color} />
    ),
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray'
  };
};

//----------------------------------------------------------------import { NavigationContainer } from "@react-navigation/native";

export const AppNavigator = () => {
  return (
    <FavoriteContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
            <Tab.Navigator screenOptions={createScreenOptions}>
              <Tab.Screen
                name="Restaurants"
                component={RestaurantsNavigator}
                options={{
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="Checkouts"
                component={CheckoutNavigator}
                options={{
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="Maps"
                component={MapNavigator}
                options={{
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  headerShown: false
                }}
              />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavoriteContextProvider>
  );
};
