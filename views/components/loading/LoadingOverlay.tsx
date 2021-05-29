import {ActivityIndicator, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {Text} from 'react-native-paper';

export const LoadingOverlay = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.84)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator
        size={'large'}
        color={theme.colors.primary}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <Text
        style={{
          marginTop: 15,
          alignSelf: 'center',
        }}>
        Loading...
      </Text>
    </View>
  );
};
