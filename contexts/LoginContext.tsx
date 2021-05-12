import React, {createContext, useContext, useEffect, useState} from 'react';
import AuthenticationService from '../services/Authentication.Service';
import {ConfigService} from '../services/Config.service';
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
  const [loading, setLoading] = useState<boolean>(true);

  const {currentServer} = useContext(ServerContext);

  const isTokenSet = (): boolean => {
    const token = currentServer?.authentication?.token;
    return token !== null && token !== undefined;
  };

  const loggedIn = () => {
    setIsAuthenticated(true);
  };

  const loggedOut = () => {
    setIsAuthenticated(false);
  };

  // useEffect(() => {
  //   RestService.addInterceptor({
  //     code: 403,
  //     callback: () => {
  //       AuthenticationService.logOut().then(() => {
  //         loggedOut();
  //       });
  //     },
  //   });
  //
  //   ConfigService.subscribeOnUpdate({
  //     key: 'LoginContext',
  //     callback: () => {
  //       AuthenticationService.isAuthenticated().then((authentication) => {
  //         setLoading(false);
  //         if (authentication) {
  //           loggedIn();
  //         } else {
  //           loggedOut();
  //         }
  //       });
  //     },
  //   });
  //   return () => {
  //     ConfigService.unSubscribeOnUpdate('LoginContext');
  //   };
  // }, []);

  useEffect(() => {
    isTokenSet() ? loggedIn() : loggedOut();
    setLoading(false);
  }, []);

  return (
    <LoginContext.Provider value={{loading, isAuthenticated, loggedIn, loggedOut}}>
      {props.children}
    </LoginContext.Provider>
  );
};
