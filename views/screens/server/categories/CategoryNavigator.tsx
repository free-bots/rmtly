import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CategoriesScreen} from './CategoriesScreen';
import {NavigationHeaderContext} from '../../../../contexts/NavigationHeaderContext';
import {ApplicationsScreen} from '../ApplicationsScreen';

const Stack = createStackNavigator();
export const CategoryNavigator = () => {
  const {headerVisible} = useContext(NavigationHeaderContext);
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{headerShown: false}} />
      <Stack.Screen
        name="Category"
        component={ApplicationsScreen}
        options={({route}) => ({title: (route.params as any)?.category?.title})}
      />
    </Stack.Navigator>
  );
};
