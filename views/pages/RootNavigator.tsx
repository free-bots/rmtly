import {NavigationContainer} from '@react-navigation/native';
import {CategoryNavigator} from './categories/CategoryNavigator';
import {NavigationHeaderContext} from '../../contexts/NavigationHeaderContext';
import React, {useContext} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Applications} from './Applications';
import {LoginNavigator} from './login/LoginNavigation';
import {LoginContext} from '../../contexts/LoginContext';
import {BaseScreen} from './base/BaseScreen';
import {ThemeContext} from '../../contexts/ThemeContext';
import {Text} from 'react-native-paper';

const Drawer = createDrawerNavigator();

export const RootNavigator = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);

  const {headerVisible, enableHeader, disableHeader} = useContext(
    NavigationHeaderContext,
  );

  const {loading, isAuthenticated} = useContext(LoginContext);

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

  const theme = isLightTheme ? light : dark;

  return (
    <NavigationContainer
      theme={theme}
      onStateChange={(state) => {
        handleNavigationChange(state);
      }}>
      {loading && (
        <>
          <BaseScreen>
            <View
              style={{
                backgroundColor: theme.colors.background,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator
                size={'large'}
                color={theme.colors.primary}
                style={{
                  position: 'relative',
                }}
              />
              <Text>Please Wait...</Text>
            </View>
          </BaseScreen>
        </>
      )}
      {!loading && !isAuthenticated && <LoginNavigator />}
      {!loading && isAuthenticated && (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: theme.colors.text,
            headerShown: headerVisible,
          }}
          detachInactiveScreens={true}>
          <Drawer.Screen name="Applications" component={Applications} />
          <Drawer.Screen name="Categories" component={CategoryNavigator} />
          <Drawer.Screen name="Connection" component={LoginNavigator} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};
