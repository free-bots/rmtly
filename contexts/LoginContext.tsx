import React, {createContext, useContext, useEffect, useState} from 'react';
import {RestService} from '../services/Rest.service';
import {ServerContext} from './ServerContext';

export const LoginContext = createContext({
  loading: true,
  isAuthenticated: false,
  loggedIn: () => {},
  loggedOut: () => {},
});

export const LoginContextProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {serverState, deleteById} = useContext(ServerContext);
  const [initializing, setInitializing] = useState(true);

  const isTokenSet = (): boolean => {
    const token = serverState.currentServer?.authentication?.token;
    return token !== null && token !== undefined;
  };

  const loggedIn = () => {
    setIsAuthenticated(true);
  };

  const loggedOut = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    RestService.addInterceptor({
      code: 403,
      callback: () => {
        if (serverState.currentServer?.id) {
          deleteById(serverState.currentServer?.id).then(() => {});
        }
      },
    });
  }, []);

  useEffect(() => {
    console.log(`login context ${JSON.stringify(serverState)}`);
    setInitializing(true);
    if (serverState.initializing) {
      return;
    }

    setIsAuthenticated(isTokenSet());
    setInitializing(false);
  }, [serverState.initializing, serverState.currentServer]);

  return (
    <LoginContext.Provider value={{loading: initializing, isAuthenticated, loggedIn, loggedOut}}>
      {props.children}
    </LoginContext.Provider>
  );
};
