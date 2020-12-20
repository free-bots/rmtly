import {Surface, Text} from 'react-native-paper';
import React, {useContext} from 'react';
import {Image} from 'react-native';
import {ThemeContext} from '../../contexts/ThemeContext';

export const Empty = () => {
  const {isLightTheme, light, dark} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <>
      <Surface
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: 100,
          height: 130,
          width: 130,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 40,
        }}>
        <Image
          style={{
            tintColor: theme.colors.primary,
          }}
          source={require('../../assets/robot-confused.png')}
        />
      </Surface>
      <Text
        style={{
          maxWidth: 130,
          color: theme.colors.text,
          marginTop: 10,
          fontSize: 15,
          textAlign: 'center',
        }}>
        Nothing here ... ?
      </Text>
    </>
  );
};
