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
import {ApplicationsContextProvider} from './contexts/ApplicationsContext';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <ThemeContextProvider>
      <ApplicationsContextProvider>
        <Routes />
      </ApplicationsContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
