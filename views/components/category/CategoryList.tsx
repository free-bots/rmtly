import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CategoryCard} from './CategoryCard';
import {ApplicationCard} from '../ApplicationCard';

export class Category {
  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  name: string;
  icon: string;
}

// todo get categories from application context
export const CategoryList = () => {
  const onPress = () => {
    // todo set current selected
  };

  const onLongPress = () => {
    // mark multiple as selected
  };
  return (
    <>
      <FlatList
        style={{
          flex: 1,
        }}
        horizontal={true}
        data={Array(10).fill((index: number) => {
          return {id: index, name: '', icon: ''};
        })}
        renderItem={(itemInfo: ListRenderItemInfo<Category>) => {
          return (
            <Pressable onPress={() => {}} onLongPress={() => {}} style={{}}>
              <CategoryCard category={itemInfo.item} />
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </>
  );
};
