import React, {useContext, useEffect} from 'react';
import {ThemeContext, ThemeContextProvider} from './ThemeContext';
import {ServerContextProvider} from './ServerContext';
import {LoginContextProvider} from './LoginContext';
import {ApplicationsContextProvider} from './ApplicationsContext';
import {NavigationHeaderContextProvider} from './NavigationHeaderContext';
import {Provider as PaperProvider} from 'react-native-paper';
import {ConnectivityContextProvider} from './ConnectivityContext';

export const UiProvider = (props: any) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);

  useEffect(() => {
    console.log(`Using light theme: ${isLightTheme}`);
  }, [isLightTheme]);

  return <PaperProvider theme={isLightTheme ? light : dark}>{props.children}</PaperProvider>;
};

export const RootContextProvider = (props: any) => {
  return (
    <ThemeContextProvider>
      <UiProvider>
        <ConnectivityContextProvider>
          <ServerContextProvider>
            <LoginContextProvider>
              <ApplicationsContextProvider>
                <NavigationHeaderContextProvider>{props.children}</NavigationHeaderContextProvider>
              </ApplicationsContextProvider>
            </LoginContextProvider>
          </ServerContextProvider>
        </ConnectivityContextProvider>
      </UiProvider>
    </ThemeContextProvider>
  );
};
