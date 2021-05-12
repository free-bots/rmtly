import React, {useContext} from 'react';
import {BaseScreen} from './base/BaseScreen';
import {ActivityIndicator, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ThemeContext} from '../../contexts/ThemeContext';

export const SplashScreen = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <>
      <BaseScreen>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            color={theme.colors.primary}
            style={{
              position: 'relative',
            }}
          />
          <Text>Please Wait...</Text>
        </View>
      </BaseScreen>
    </>
  );
};
