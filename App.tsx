/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {ApplicationsContextProvider} from './contexts/ApplicationsContext';
import {NavigationHeaderContextProvider} from './contexts/NavigationHeaderContext';
import {RootNavigator} from './views/pages/RootNavigator';
import {LoginContextProvider} from './contexts/LoginContext';
import {ConfigService} from './services/Config.service';

const App = () => {
  useEffect(() => {
    ConfigService.forceUpdate();
  }, []);

  return (
    <ThemeContextProvider>
      <LoginContextProvider>
        <ApplicationsContextProvider>
          <NavigationHeaderContextProvider>
            <RootNavigator />
          </NavigationHeaderContextProvider>
        </ApplicationsContextProvider>
      </LoginContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
