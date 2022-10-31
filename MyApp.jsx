import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components";

import { Navigation } from "./src/infrastructure/navigation";
import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
};
