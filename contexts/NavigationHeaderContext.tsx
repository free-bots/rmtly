import React, {createContext, useState} from 'react';

/**
 * @deprecated
 */
export const NavigationHeaderContext = createContext({
  disableHeader: () => {},
  enableHeader: () => {},
  headerVisible: true,
});

export const NavigationHeaderContextProvider = (props: any) => {
  const [headerVisible, setHeaderVisible] = useState<boolean>(true);
  const disableHeader = () => {
    setHeaderVisible(false);
  };
  const enableHeader = () => {
    setHeaderVisible(true);
  };
  return (
    <NavigationHeaderContext.Provider value={{disableHeader, enableHeader, headerVisible}}>
      {props.children}
    </NavigationHeaderContext.Provider>
  );
};
