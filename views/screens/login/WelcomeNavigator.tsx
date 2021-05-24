import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Welcome} from './Welcome';

const Stack = createStackNavigator();

export const WelcomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode={'screen'}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
};
