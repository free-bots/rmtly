import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {ConnectionInfo} from './connection/ConnectionInfo';
import {Settings} from './Settings';
import {ServerList} from './ServerList';
import {ServerConnection} from '../login/connection/ServerConnection';
import {ServerAuthentication} from '../login/connection/ServerAuthentication';
import {ServerAuthenticationQr} from '../login/connection/ServerAuthenticationQr';

const Stack = createStackNavigator();
export const SettingsNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="ConnectionInfo" component={ConnectionInfo} />
      <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}} />
      <Stack.Screen name="ServerList" component={ServerList} />
      <Stack.Screen name="ServerConnection" component={ServerConnection} />
      <Stack.Screen name="ServerAuthentication" component={ServerAuthentication} />
      <Stack.Screen name="ServerAuthenticationQr" component={ServerAuthenticationQr} />
    </Stack.Navigator>
  );
};
