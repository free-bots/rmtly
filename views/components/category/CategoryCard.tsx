import React from 'react';
import {Text, View} from 'react-native';
import {Category} from './CategoryList';

export const CategoryCard = ({category}: {category: Category}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        margin: 5,
        padding: 10,
        height: 120,
        width: 120,
      }}>
      <Text>Category Card</Text>
      <Text>{category.name}</Text>
    </View>
  );
};
