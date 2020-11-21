import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {CategoryNavigator} from './categories/CategoryNavigator';
import {Connection} from './settings/Connection';
import {NavigationHeaderContext} from '../../contexts/NavigationHeaderContext';
import React, {useContext} from 'react';
import {useColorScheme} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Applications} from './Applications';

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const scheme = useColorScheme();

  const {headerVisible, enableHeader, disableHeader} = useContext(
    NavigationHeaderContext,
  );

  /**
   * toggles the header in the navigation to prevent multiple headers for each navigator
   * @param change
   */
  const handleNavigationChange = (change: any) => {
    const index = change.index;
    const currentNavigationState = change.routes[index].state;

    if (
      currentNavigationState?.type === 'stack' &&
      currentNavigationState?.index > 0
    ) {
      // in a nested navigator
      disableHeader();
    } else {
      enableHeader();
    }
  };

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
      onStateChange={(state) => {
        handleNavigationChange(state);
      }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: headerVisible,
        }}
        detachInactiveScreens={true}>
        <Drawer.Screen name="Applications" component={Applications} />
        <Drawer.Screen name="Categories" component={CategoryNavigator} />
        <Drawer.Screen name="Connection" component={Connection} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
