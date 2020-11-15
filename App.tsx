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

declare const global: {HermesInternal: null | {}};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <ThemeContextProvider>
      <ApplicationsContextProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Applications" component={Home} />
            <Drawer.Screen name="Connection" component={Connection} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationsContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
