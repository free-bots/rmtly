/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {ApplicationsContextProvider} from './contexts/ApplicationsContext';
import {NavigationHeaderContextProvider} from './contexts/NavigationHeaderContext';
import {RootNavigator} from './views/pages/RootNavigator';

const App = () => {
  return (
    <ThemeContextProvider>
      <ApplicationsContextProvider>
        <NavigationHeaderContextProvider>
          <RootNavigator />
        </NavigationHeaderContextProvider>
      </ApplicationsContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
