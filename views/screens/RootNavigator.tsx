import {NavigationContainer} from '@react-navigation/native';
import {NavigationHeaderContext} from '../../contexts/NavigationHeaderContext';
import React, {useContext} from 'react';
import {LoginNavigator} from './login/LoginNavigation';
import {LoginContext} from '../../contexts/LoginContext';
import {ThemeContext} from '../../contexts/ThemeContext';
import {SplashScreen} from './SplashScreen';
import {DrawerNavigator} from './server/DrawerNavigator';

export const RootNavigator = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);

  const {enableHeader, disableHeader} = useContext(NavigationHeaderContext);

  const {loading, isAuthenticated} = useContext(LoginContext);

  /**
   * toggles the header in the navigation to prevent multiple headers for each navigator
   * @param change
   */
  const handleNavigationChange = (change: any) => {
    const index = change.index;
    const currentNavigationState = change.routes[index].state;

    if (currentNavigationState?.type === 'stack' && currentNavigationState?.index > 0) {
      // in a nested navigator
      disableHeader();
    } else {
      enableHeader();
    }
  };

  const theme = isLightTheme ? light : dark;

  return (
    <NavigationContainer
      theme={theme}
      onStateChange={(state) => {
        handleNavigationChange(state);
      }}>
      {loading && <SplashScreen />}
      {!loading && !isAuthenticated && <LoginNavigator />}
      {!loading && isAuthenticated && <DrawerNavigator />}
    </NavigationContainer>
  );
};
