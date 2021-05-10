import React, {createContext, useState} from 'react';
import {Server} from '../models/persistence/Server';

export interface ServerContextType {
  servers: Server[];
  setServers: (servers: Server[]) => void;
}

export const ServerContext = createContext<ServerContextType>({
  servers: [],
  setServers: () => {},
});

// todo add.. update.. delete..

export const ServerContextProvider = (props: any) => {
  const [servers, setServers] = useState<Server[]>(
    Array(100)
      .fill(0)
      .map((value, index) => ({
        name: `TEST ${index}`,
        url: `TEST ${index}`,
        id: `TEST ${index}`,
        authentication: {token: 'TEST'},
      })),
  );

  return (
    <ServerContext.Provider
      value={{
        servers: servers,
        setServers: setServers,
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};
