import {View} from 'react-native';
import {Avatar, Surface, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {ServerContext} from '../../../contexts/ServerContext';

export const DrawerContent = (props: any) => {
  const {serverState} = useContext(ServerContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  return (
    <>
      <Surface
        style={{
          margin: 8,
          padding: 8,
          elevation: 15,
          backgroundColor: theme.colors.primary,
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
          <Avatar.Icon
            size={50}
            icon="server"
            theme={{colors: {primary: theme.colors.surface}}}
            style={{
              marginEnd: 10,
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 15}}>Connected with:</Text>
            <Text style={{color: 'white', fontSize: 20, flex: 1}}>
              {serverState.currentServer ? serverState.currentServer.name : 'Server'}
            </Text>
          </View>
        </View>
      </Surface>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
};
