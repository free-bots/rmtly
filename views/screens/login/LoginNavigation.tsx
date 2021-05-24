import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {ServerConnection} from './connection/ServerConnection';
import {ServerAuthentication} from './connection/ServerAuthentication';
import {ServerAuthenticationQr} from './connection/ServerAuthenticationQr';
import {Welcome} from './Welcome';
import {ServerContext} from '../../../contexts/ServerContext';

const Stack = createStackNavigator();
export const LoginNavigator = () => {
  const {serverState} = useContext(ServerContext);
  return (
    <Stack.Navigator
      initialRouteName={serverState.servers.length ? 'ServerConnection' : 'Welcome'}
      headerMode={'screen'}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ServerConnection" component={ServerConnection} />
      <Stack.Screen name="ServerAuthentication" component={ServerAuthentication} />
      <Stack.Screen name="ServerAuthenticationQr" component={ServerAuthenticationQr} />
    </Stack.Navigator>
  );
};
