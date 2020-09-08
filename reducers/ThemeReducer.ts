import {ThemeState} from '../contexts/ThemeContext';

export const ThemeReducer = (
  state: ThemeState,
  action: {type: string; payload?: any},
): ThemeState => {
  switch (action.type) {
    case 'USE_LIGHT_THEME':
      return {
        ...state,
        isLightTheme: true,
      };
    case 'USE_DARK_THEME':
      return {
        ...state,
        isLightTheme: false,
      };
    default:
      return state;
  }
};
