import React, {createContext, useEffect, useState} from 'react';

import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';

export interface ThemeState {
  light: any;
  dark: any;
  isLightTheme: boolean;
}

export class Theme {
  constructor(accentColor: string) {
    this.accentColor = accentColor;
  }

  accentColor: string;
}

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#007AFFFF',
    accent: '#0982ff',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#6230ff',
    accent: '#6d15c2',
  },
};

const initialState = {
  light: CombinedDefaultTheme,
  dark: CombinedDarkTheme,
  isLightTheme: true,
};

export const ThemeContext = createContext({
  ...initialState,
});

export const ThemeContextProvider = (props: any) => {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeState>(initialState);

  useEffect(() => {
    setTheme({...theme, isLightTheme: scheme !== 'dark'});
  }, [scheme]);

  return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
};
