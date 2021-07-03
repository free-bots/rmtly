import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../../components/drawer/DrawerContent';
import {ApplicationsScreen} from './ApplicationsScreen';
import {CategoryNavigator} from './categories/CategoryNavigator';
import {SettingsNavigator} from '../settings/SettingsNavigator';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {ServerContext} from '../../../contexts/ServerContext';
import {ScriptsNavigator} from './scripts/ScriptsNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  const {headerVisible} = useContext(NavigationHeaderContext);
  const {serverState} = useContext(ServerContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...{...props, name: serverState.currentServer}} />}
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerShown: headerVisible,
      }}
      detachInactiveScreens={true}>
      <Drawer.Screen
        options={{headerTitle: `Applications @ ${serverState.currentServer?.url}`}}
        name="Applications"
        component={ApplicationsScreen}
      />
      <Drawer.Screen
        options={{headerTitle: `Categories @ ${serverState.currentServer?.url}`}}
        name="Categories"
        component={CategoryNavigator}
      />
      <Drawer.Screen
        options={{headerTitle: `Scripts @ ${serverState.currentServer?.url}`}}
        name="Scripts"
        component={ScriptsNavigator}
      />
      <Drawer.Screen name="Settings" component={SettingsNavigator} />
    </Drawer.Navigator>
  );
};
