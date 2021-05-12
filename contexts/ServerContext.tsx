import React, {createContext, useEffect, useState} from 'react';
import {Server} from '../models/persistence/Server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toJson, toObject} from '../utils/JsonConverter';

export interface ServerContextType {
  currentServer: Server | null;
  setCurrentServer: (id: string) => void;
  servers: Server[];
  add: (server: Server) => void;
  update: (server: Server) => void;
  delete: (id: string) => string;
}

export const ServerContext = createContext<ServerContextType>({
  currentServer: null,
  setCurrentServer: () => {},
  servers: [],
  add: () => {},
  update: () => {},
  delete: () => '',
});

export const ServerContextProvider = (props: any) => {
  const SERVER_KEY = 'SERVERS';
  const CURRENT_SERVER_KEY = 'CURRENT_SERVER';

  const [servers, setServers] = useState<Server[]>([]);
  const [currentServer, _setCurrentServer] = useState<Server | null>(null);

  useEffect(() => {
    loadFromStorage();
  }, []);

  const add = (server: Server): void => {
    // create new uuid ?
    const newServerList = [...servers, server];
    setServers(newServerList);
    AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));
  };

  const update = (server: Server): void => {
    const newServerList = [...servers.filter((currentServer) => currentServer.id === server.id), server];
    setServers(newServerList);
    AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));
  };

  const deleteServer = (id: string): string => {
    const newServerList = [...servers.filter((currentServer) => currentServer.id === id)];
    setServers(newServerList);
    AsyncStorage.setItem(SERVER_KEY, toJson(newServerList));
    return id;
  };

  const setCurrentServer = (id: string) => {
    const _currentServer = servers.find((value) => value.id === id);
    if (!_currentServer) {
      _setCurrentServer(null);
      return;
    }

    _setCurrentServer(_currentServer);
  };

  const loadFromStorage = async () => {
    try {
      const serversAsJson = await AsyncStorage.getItem(SERVER_KEY);
      if (!serversAsJson) {
        _setCurrentServer(null);
        setServers([]);
        return;
      }

      const serverList = toObject<Server[]>(serversAsJson) || [];
      setServers(serverList);

      const currentServerId = await AsyncStorage.getItem(CURRENT_SERVER_KEY);
      if (!currentServerId) {
        return;
      }

      setCurrentServer(currentServerId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ServerContext.Provider
      value={{
        currentServer,
        setCurrentServer,
        servers,
        add,
        update,
        delete: deleteServer,
      }}>
      {props.children}
    </ServerContext.Provider>
  );
};
