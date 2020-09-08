import React, {createContext} from 'react';

export const ApplicationContext = createContext({});

export const ApplicationContextProvider = (props: any) => {
  return (
    <ApplicationContext.Provider value={{}}>
      {props.children}
    </ApplicationContext.Provider>
  );
};
