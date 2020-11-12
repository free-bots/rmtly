import React, {useState} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

export const FallbackImage = ({
  url,
  style,
}: {
  url: string;
  style?: StyleProp<ImageStyle>;
}) => {
  const [imageSource, setImageSource] = useState<{uri: any}>({uri: url});

  return (
    <Image
      source={imageSource}
      style={style}
      onError={() => {
        // todo default icon
        // setImageSource({uri: ''});
      }}
    />
  );
};
