import {Text, View} from 'react-native';
import React from 'react';
import {BaseScreen} from '../base/BaseScreen';
import Button from '../../components/buttons/Button';
import {Avatar, Surface} from 'react-native-paper';

export const Welcome = ({navigation}: any) => {
  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              padding: 50,
              alignSelf: 'center',
            }}>
            <Surface
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 40,
              }}>
              <Avatar.Icon
                icon={'folder'}
                style={{
                  alignSelf: 'center',
                }}
              />
            </Surface>
          </View>
          <View
            style={{
              flex: 2,
              alignSelf: 'center',
            }}>
            <Text>Hi</Text>
            <Text>Hi</Text>
          </View>
          <Button
            onPress={() => {
              navigation.navigate('ServerConnection');
            }}>
            Login
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
