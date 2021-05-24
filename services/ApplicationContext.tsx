import {ApplicationEntry} from '../models/ApplicationEntry';
import {ExecuteRequest} from '../models/Request.model';
import {ExecuteResponse, SortedApplicationResponse, SortKey} from '../models/Response.model';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ServerContext} from '../contexts/ServerContext';
import {RestService} from './Rest.service';
import {UrlBuilder} from './UrlBuilder';

export interface ApplicationContextType {
  getAllApplications: () => Promise<ApplicationEntry[]>;
  getApplicationById: (applicationId: string) => Promise<ApplicationEntry>;
  executeApplication: (applicationId: string, request: ExecuteRequest) => Promise<ExecuteResponse>;
  getIcon: (applicationId: string, url?: string) => string;
  sortApplicationBy: (sortKey: SortKey) => Promise<SortedApplicationResponse>;
}

export const ApplicationContext = createContext<ApplicationContextType>({} as any);

export const ApplicationContextProvider = (props: any) => {
  const {serverState} = useContext(ServerContext);
  const [state, setState] = useState({
    url: serverState.currentServer?.url,
    token: serverState.currentServer?.authentication.token,
  });

  useEffect(() => {
    setState({url: serverState.currentServer?.url, token: serverState.currentServer?.authentication.token});
  }, [serverState.currentServer]);

  const getAllApplications = (): Promise<ApplicationEntry[]> => {
    return RestService.get<ApplicationEntry[]>(
      UrlBuilder.getInstance().append('applications').create(state.url),
      true,
      state.token,
    );
  };

  const getApplicationById = (applicationId: string): Promise<ApplicationEntry> => {
    return RestService.get<ApplicationEntry>(
      UrlBuilder.getInstance().append('applications').append(applicationId).create(state.url),
    );
  };

  const executeApplication = (applicationId: string, request: ExecuteRequest): Promise<ExecuteResponse> => {
    return RestService.post<ExecuteResponse>(
      UrlBuilder.getInstance().append('applications').append(applicationId).append('execute').create(state.url),
      request,
      state.token,
    );
  };

  const getIcon = (applicationId: string, url?: string): string => {
    return UrlBuilder.getInstance().append('applications').append(applicationId).append('icon').create(url || state.url);
  };

  const sortApplicationBy = (sortKey: SortKey): Promise<SortedApplicationResponse> => {
    return RestService.get<SortedApplicationResponse>(
      UrlBuilder.getInstance().append(`applications?sortedBy=${sortKey}`).create(state.url),
      true,
      state.token,
    );
  };

  return (
    <ApplicationContext.Provider
      value={{
        getAllApplications,
        getApplicationById,
        executeApplication,
        getIcon,
        sortApplicationBy,
      }}>
      {props.children}
    </ApplicationContext.Provider>
  );
};
