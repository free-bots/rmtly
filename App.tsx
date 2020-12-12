/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useContext, useEffect} from 'react';
import {ThemeContext, ThemeContextProvider} from './contexts/ThemeContext';
import {ApplicationsContextProvider} from './contexts/ApplicationsContext';
import {NavigationHeaderContextProvider} from './contexts/NavigationHeaderContext';
import {RootNavigator} from './views/pages/RootNavigator';
import {LoginContextProvider} from './contexts/LoginContext';
import {ConfigService} from './services/Config.service';
import {Provider as PaperProvider} from 'react-native-paper';

export const UiProvider = (props: any) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);

  useEffect(() => {
    console.log(`Using light theme: ${isLightTheme}`);
  }, [isLightTheme]);

  return (
    <PaperProvider theme={isLightTheme ? light : dark}>
      {props.children}
    </PaperProvider>
  );
};

const App = () => {
  useEffect(() => {
    ConfigService.forceUpdate();
  }, []);

  return (
    <ThemeContextProvider>
      <UiProvider>
        <LoginContextProvider>
          <ApplicationsContextProvider>
            <NavigationHeaderContextProvider>
              <RootNavigator />
            </NavigationHeaderContextProvider>
          </ApplicationsContextProvider>
        </LoginContextProvider>
      </UiProvider>
    </ThemeContextProvider>
  );
};

export default App;
