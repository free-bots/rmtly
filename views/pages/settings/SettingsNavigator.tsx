import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {ConnectionInfo} from './connection/ConnectionInfo';

const Stack = createStackNavigator();
export const SettingsNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator
      initialRouteName="ConnectionInfo"
      headerMode={headerVisible ? 'none' : 'screen'}>
      <Stack.Screen name="ConnectionInfo" component={ConnectionInfo} />
    </Stack.Navigator>
  );
};
