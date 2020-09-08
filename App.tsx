/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Routes} from './routes/Router';
import {ThemeContextProvider} from './contexts/ThemeContext';
import {ApplicationContextProvider} from './contexts/ApplicationContext';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ThemeContextProvider>
      <ApplicationContextProvider>
        <Routes />
      </ApplicationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
