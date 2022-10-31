import { StatusBar } from "expo-status-bar";
import { AppRegistry } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import { name as appName } from "./app.json";
import { App } from "./MyApp";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export default function Main() {
  return (
    <>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
      <StatusBar style="auto" />
    </>
  );
}

AppRegistry.registerComponent(appName, () => Main);
