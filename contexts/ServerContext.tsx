import React, {createContext, useEffect, useState} from 'react';
import {Server} from '../models/persistence/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toJson, toObject} from '../utils/JsonConverter';

export interface ServerState {
  currentServer: Server | null;
  servers: Server[];
  initializing: boolean;
}

export interface ServerContextType {
  serverState: ServerState;
  setCurrentServer: (id: string) => Promise<void>;
  add: (server: Server) => Promise<void>;
  update: (server: Server) => Promise<void>;
  deleteById: (id: string) => Promise<string>;
}

const initialState: ServerState = {
  currentServer: null,
  initializing: true,
  servers: [],
};

export const ServerContext = createContext<ServerContextType>({
  serverState: initialState,
  setCurrentServer: () => Promise.resolve(),
  add: () => Promise.resolve(),
  update: () => Promise.resolve(),
  deleteById: () => Promise.resolve(''),
});

export const ServerContextProvider = (props: any) => {
  const SERVER_KEY = 'SERVERS';
  const CURRENT_SERVER_KEY = 'CURRENT_SERVER';

  const [serverState, setServerState] = useState<ServerState>(initialState);

  useEffect(() => {
    loadFromStorage().then(async () => {
      console.log('loaded server list');
    });
  }, []);

  const add = async (server: Server): Promise<void> => {
    console.log(`add: ${server.id}`);
    // create new uuid ?
    const newServerList = [...serverState.servers, server];
    await AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));
    await AsyncStorage.setItem(CURRENT_SERVER_KEY, server.id);

    setServerState((prevState) => ({
      ...prevState,
      servers: newServerList,
      currentServer: getCurrentServer(server.id, newServerList),
    }));
  };

  const update = async (server: Server): Promise<void> => {
    const newServerList = [...serverState.servers.filter((currentServer) => currentServer.id === server.id), server];
    await AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));
    setServerState((prevState) => ({...prevState, servers: newServerList}));
  };

  const deleteById = async (id: string): Promise<string> => {
    const newServerList = [...serverState.servers.filter((server) => server.id !== id)];
    setServerState((prevState) => ({...prevState, servers: newServerList}));
    await AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));

    if (serverState.currentServer?.id === id) {
      const firstServerId = newServerList.length > 0 ? newServerList[0].id : null;
      if (firstServerId) {
        await setCurrentServer(firstServerId);
      } else {
        await setCurrentServer(null);
      }
    }

    return id;
  };

  const setCurrentServer = async (id: string | null) => {
    console.log(`setCurrentServer: ${id}`);
    const _currentServer = serverState.servers.find((value) => value.id === id);
    if (!_currentServer || !id) {
      await AsyncStorage.removeItem(CURRENT_SERVER_KEY);
      setServerState((prevState) => ({...prevState, currentServer: null}));
      return;
    }

    console.log(`CURRENT_SERVER: [${id}]`);

    setServerState((prevState) => ({...prevState, currentServer: _currentServer}));
    await AsyncStorage.setItem(CURRENT_SERVER_KEY, id);
  };

  const loadFromStorage = async () => {
    setServerState((prevState) => ({...prevState, initializing: true}));
    try {
      const serversAsJson = await AsyncStorage.getItem(SERVER_KEY);
      const currentServerId = await AsyncStorage.getItem(CURRENT_SERVER_KEY);
      console.log(`currentServerId: ${currentServerId}`);

      if (serversAsJson) {
        const serverList = toObject<Server[]>(serversAsJson) || [];
        setServerState((prevState) => ({
          ...prevState,
          servers: serverList,
          currentServer: getCurrentServer(currentServerId, serverList),
        }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setServerState((prevState) => ({...prevState, initializing: false}));
    }
  };

  const getCurrentServer = (currentServerId: string | null | undefined, servers: Server[]): Server | null => {
    if (!currentServerId && servers.length) {
      return servers[0];
    }

    if (currentServerId && servers.length) {
      return servers.find((server) => server.id === currentServerId) || null;
    }

    if (currentServerId && !servers.length) {
      return null;
    }

    return null;
  };

  return (
    <ServerContext.Provider
      value={{
        serverState,
        setCurrentServer,
        add,
        update,
        deleteById,
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};
