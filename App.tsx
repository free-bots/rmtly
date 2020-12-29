/**
 *
 *                   _   _
 *                  | | | |
 *   _ __ _ __ ___ | |_| |_   _
 *  | '__| '_ ` _ \| __| | | | |
 *  | |  | | | | | | |_| | |_| |
 *  |_|  |_| |_| |_|\__|_|\__, |
 *                         __/ |
 *                        |___/
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
