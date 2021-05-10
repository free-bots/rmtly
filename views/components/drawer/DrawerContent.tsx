import {View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import React from 'react';

export const DrawerContent = (props: any) => {
  return (
    <>
      <View
        style={{
          backgroundColor: '#f50057',
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Avatar.Icon size={24} icon="folder" />
          <Text style={{color: 'white', fontSize: 30}}>Header</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};
