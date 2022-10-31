import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";

const AuthStack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Main" component={AccountScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
