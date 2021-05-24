import {Dispatch, SetStateAction, useContext, useState} from 'react';
import AuthenticationService from '../../../../../services/Authentication.Service';
import {ServerContext} from '../../../../../contexts/ServerContext';
import ServerInformationService from '../../../../../services/ServerInformation.service';

export const useConnectWithServer = (): [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (url: string, codeRef?: string) => Promise<number>,
] => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {add, serverState} = useContext(ServerContext);

  const addServer = async (url: string, codeRef?: string): Promise<number> => {
    setLoading(true);
    if (!code && !codeRef) {
      return Promise.reject('no code!');
    }

    try {
      const authenticationResponse = await AuthenticationService.signUp({
        url,
        deviceId: '',
        qrCode: codeRef || code,
      });
      console.log(authenticationResponse);

      const serverInformation = await ServerInformationService.getInformation(url);
      console.log(serverInformation);
      await add({
        id: serverInformation.id,
        url: url,
        name: serverInformation.name,
        authentication: {
          token: authenticationResponse.token,
        },
        configuration: {updateInterval: 5000},
      });
    } catch (reason) {
      console.error(reason);
      setCode('');
      throw Error(reason);
    } finally {
      setLoading(false);
    }

    return serverState.servers.length + 1;
  };

  return [loading, code, setCode, addServer];
};
