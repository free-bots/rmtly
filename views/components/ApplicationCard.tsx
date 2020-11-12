import React, {useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';

export const ApplicationCard = ({
  name,
  icon,
  loading,
}: {
  name: string;
  icon: string;
  loading: boolean;
}) => {
  const [imageSource, setImageSource] = useState<{uri: any}>({uri: icon});
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
      <Image
        source={imageSource}
        style={{width: 50, height: 50}}
        onError={() => {
          // todo default icon
          // setImageSource({uri: ''});
        }}
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
