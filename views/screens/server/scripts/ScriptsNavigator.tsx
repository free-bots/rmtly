import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationHeaderContext} from '../../../../contexts/NavigationHeaderContext';
import {ScriptsScreen} from './ScriptsScreen';

const Stack = createStackNavigator();
export const ScriptsNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator initialRouteName="Scripts">
      <Stack.Screen name="Scripts" component={ScriptsScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
