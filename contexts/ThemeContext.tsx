import React, {createContext, useReducer} from 'react';
import {ThemeReducer} from '../reducers/ThemeReducer';

export const ThemeContext = createContext({});

export class ThemeState {
  constructor(light: {}, dark: {}, isLightTheme: true) {
    this.light = light;
    this.dark = dark;
    this.isLightTheme = isLightTheme;
  }
  light: {}; // todo Theme class
  dark: {};
  isLightTheme: boolean;
}

export class Theme {
  constructor(accentColor: string) {
    this.accentColor = accentColor;
  }

  accentColor: string;
}

const initialState = {
  light: {},
  dark: {},
  isLightTheme: true,
};

export const ThemeContextProvider = (props: any) => {
  const [theme, dispatch] = useReducer(ThemeReducer, initialState);
  return (
    <ThemeContext.Provider value={{theme, themeDispatcher: dispatch}}>
      {props.children}
    </ThemeContext.Provider>
  );
};
