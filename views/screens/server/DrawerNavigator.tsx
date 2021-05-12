import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../../components/drawer/DrawerContent';
import {Applications} from './Applications';
import {CategoryNavigator} from './categories/CategoryNavigator';
import {SettingsNavigator} from '../settings/SettingsNavigator';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerShown: headerVisible,
      }}
      detachInactiveScreens={true}>
      <Drawer.Screen name="Applications" component={Applications} />
      <Drawer.Screen name="Categories" component={CategoryNavigator} />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
    </Drawer.Navigator>
  );
};
