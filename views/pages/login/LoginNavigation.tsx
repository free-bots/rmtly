import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ServerConnection} from './connection/ServerConnection';
import {ServerAuthentication} from './connection/ServerAuthentication';
import {ServerAuthenticationQr} from './connection/ServerAuthenticationQr';
import {Welcome} from './Welcome';

const Stack = createStackNavigator();
export const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode={'screen'}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ServerConnection" component={ServerConnection} />
      <Stack.Screen
        name="ServerAuthentication"
        component={ServerAuthentication}
      />
      <Stack.Screen
        name="ServerAuthenticationQr"
        component={ServerAuthenticationQr}
      />
    </Stack.Navigator>
  );
};
