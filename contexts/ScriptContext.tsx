import {ExecuteRequest} from '../models/Request.model';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ServerContext} from './ServerContext';
import {RestService} from '../services/Rest.service';
import {UrlBuilder} from '../services/UrlBuilder';
import {ScriptEntry} from '../models/ScriptEntry';

export interface ScriptContextType {
  getAllScripts: () => Promise<ScriptEntry[]>;
  executeScript: (scriptName: string, request: ExecuteRequest) => Promise<void>;
}

export const ScriptContext = createContext<ScriptContextType>({} as any);

export const ScriptContextProvider = (props: any) => {
  const {serverState} = useContext(ServerContext);
  const [state, setState] = useState({
    url: serverState.currentServer?.url,
    token: serverState.currentServer?.authentication.token,
  });

  useEffect(() => {
    setState({url: serverState.currentServer?.url, token: serverState.currentServer?.authentication.token});
  }, [serverState.currentServer]);

  const getAllScripts = (): Promise<ScriptEntry[]> => {
    return RestService.get<ScriptEntry[]>(
      UrlBuilder.getInstance().append('scripts/').create(state.url),
      true,
      state.token,
    );
  };

  const executeScript = (scriptName: string, request: ExecuteRequest): Promise<void> => {
    return RestService.post<void>(
      UrlBuilder.getInstance().append('scripts').append(scriptName).append('execute').create(state.url),
      request,
      state.token,
      false,
    );
  };

  return (
    <ScriptContext.Provider
      value={{
        getAllScripts,
        executeScript,
      }}>
      {props.children}
    </ScriptContext.Provider>
  );
};
