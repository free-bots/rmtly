import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Categories} from './Categories';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';
import {Applications} from '../Applications';

const Stack = createStackNavigator();
export const CategoryNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      headerMode={headerVisible ? 'none' : 'screen'}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="Category"
        component={Applications}
        options={({route}) => ({title: (route.params as any)?.category?.title})}
      />
    </Stack.Navigator>
  );
};
