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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './views/pages/Home';
import {Connection} from './views/pages/settings/Connection';
import {Categories} from './views/pages/categories/Categories';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {CategoryNavigator} from './views/pages/categories/CategoryNavigator';
import {
  NavigationHeaderContext,
  NavigationHeaderContextProvider,
} from './contexts/NavigationHeaderContext';
import {RootNavigator} from './views/pages/RootNavigator';

declare const global: {HermesInternal: null | {}};

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
