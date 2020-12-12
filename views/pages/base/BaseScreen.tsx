import React, {useContext} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {ThemeContext} from '../../../contexts/ThemeContext';

export const BaseScreen = (props: React.ComponentProps<any>) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  return (
    <>
      <StatusBar
        barStyle={isLightTheme ? 'dark-content' : 'light-content'}
        backgroundColor={theme.colors.surface}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {props.children}
      </SafeAreaView>
    </>
  );
};
