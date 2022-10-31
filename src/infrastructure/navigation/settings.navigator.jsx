import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack';
import { CameraScreen } from '../../features/settings/screens/camera.screen';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
      {/* <SettingsStack.Screen name="Favorites" component={FavoritesScreen} /> */}
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
