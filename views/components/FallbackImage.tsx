import React, {useState} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {RestService} from '../../services/Rest.service';

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
      source={{
        headers: {
          Authorization: RestService.headersConfig().get('Authorization') || '',
        },
        ...imageSource,
      }}
      style={style}
      onError={() => {
        // todo default icon
        // setImageSource({uri: ''});
      }}
      // loadingIndicatorSource={}
      // defaultSource={}
    />
  );
};
