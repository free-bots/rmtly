import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Category} from './Category';
import {Categories} from './Categories';
import {NavigationHeaderContext} from '../../../contexts/NavigationHeaderContext';

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
        component={Category}
        options={({route}) => ({title: (route.params as any)?.category})}
      />
    </Stack.Navigator>
  );
};
