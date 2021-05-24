import React, {useContext, useState} from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
import {ThemeContext} from '../../contexts/ThemeContext';

export const FallbackImage = ({url, style, token}: {url: string; style?: StyleProp<ImageStyle>; token?: string}) => {
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
              headers: token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {},
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
