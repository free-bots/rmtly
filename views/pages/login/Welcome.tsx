import {Button, Text} from 'react-native';
import React from 'react';
import {BaseScreen} from '../base/BaseScreen';

export const Welcome = ({navigation}: any) => {
  return (
    <>
      <BaseScreen>
        <Text>Hi</Text>
        <Button
          title={'Login'}
          onPress={() => {
            navigation.navigate('ServerConnection');
          }}
        />
      </BaseScreen>
    </>
  );
};
