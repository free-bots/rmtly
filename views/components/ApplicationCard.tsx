import React from 'react';
import {ActivityIndicator, Dimensions, PixelRatio, Text, View} from 'react-native';

export const ApplicationCard = ({name, icon}: {name: string; icon: string}) => {
  const loading = true;
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
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      {/*<Image source={undefined}/>*/}
      <Text>{name}</Text>
      {loading && <ActivityIndicator size={'large'} color={'green'} />}
    </View>
  );
};
