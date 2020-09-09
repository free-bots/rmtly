import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export const ApplicationCard = ({name, icon}: {name: string; icon: string}) => {
  const loading = true;
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
      {/*<Image source={undefined}/>*/}
      <Text>Name:{name}</Text>
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
