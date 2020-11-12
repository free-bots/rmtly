import React, {createContext} from 'react';

export const ApplicationsContext = createContext({});

export const ApplicationsContextProvider = (props: any) => {
  return (
    <ApplicationsContext.Provider value={{}}>
      {props.children}
    </ApplicationsContext.Provider>
  );
};
