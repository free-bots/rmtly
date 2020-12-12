import React, {useContext, useState} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {RestService} from '../../services/Rest.service';
import {ThemeContext} from '../../contexts/ThemeContext';

export const FallbackImage = ({
  url,
  style,
}: {
  url: string;
  style?: StyleProp<ImageStyle>;
}) => {
  const [imageSource, setImageSource] = useState<{uri: any}>({uri: url});
  const [error, setError] = useState<boolean>(false);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <Image
      source={
        error
          ? imageSource
          : {
              headers: {
                Authorization:
                  RestService.headersConfig().get('Authorization') || '',
              },
              ...imageSource,
            }
      }
      style={{
        ...(style as any),
        ...(error ? {tintColor: theme.colors.text} : {}),
      }}
      onError={() => {
        // todo default icon
        // setImageSource({uri: ''});
        setError(true);
        setImageSource(require('../../assets/code.png'));
      }}
      // loadingIndicatorSource={}
      // defaultSource={}
    />
  );
};
