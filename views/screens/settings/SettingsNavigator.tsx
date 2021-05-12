import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {ConnectionInfo} from './connection/ConnectionInfo';
import {Settings} from './Settings';
import {ServerList} from './ServerList';

const Stack = createStackNavigator();
export const SettingsNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator initialRouteName="Settings" headerMode={headerVisible ? 'none' : 'screen'}>
      <Stack.Screen name="ConnectionInfo" component={ConnectionInfo} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ServerList" component={ServerList} />
    </Stack.Navigator>
  );
};
