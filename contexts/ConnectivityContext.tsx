import React, {createContext, useState} from 'react';

export const ConnectivityContext = createContext({
  offline: false,
  setState: (offline: boolean) => {},
});

export const ConnectivityContextProvider = (props: any) => {
  const [offline, setState] = useState(false);

  return (
    <ConnectivityContext.Provider value={{offline: offline, setState: setState}}>
      {props.children}
    </ConnectivityContext.Provider>
  );
};
