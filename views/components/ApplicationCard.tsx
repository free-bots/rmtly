import React, {useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {FallbackImage} from './FallbackImage';

export const ApplicationCard = ({
  name,
  icon,
  loading,
}: {
  name: string;
  icon: string;
  loading: boolean;
}) => {
  return (
    <View
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10,
        margin: 5,
        padding: 10,
        height: 120,
        width: 120,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <FallbackImage
        url={icon}
        style={{height: 50, width: 50, alignSelf: 'center'}}
      />
      <Text>{name}</Text>
      {loading && (
        <ActivityIndicator
          size={'large'}
          color={'#7e23e8'}
          style={{
            position: 'absolute',
            margin: 'auto',
            height: '50%',
            width: '50%',
            top: 33,
            left: 33,
            right: 33,
            bottom: 33,
          }}
        />
      )}
    </View>
  );
};
