import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {ServerConnection} from './ServerConnection';
import {ServerAuthentication} from './ServerAuthentication';

const Stack = createStackNavigator();
export const ConnectionNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator
      initialRouteName="ServerConnection"
      headerMode={headerVisible ? 'none' : 'screen'}>
      <Stack.Screen name="ServerConnection" component={ServerConnection} />
      <Stack.Screen
        name="ServerAuthentication"
        component={ServerAuthentication}
      />
    </Stack.Navigator>
  );
};
