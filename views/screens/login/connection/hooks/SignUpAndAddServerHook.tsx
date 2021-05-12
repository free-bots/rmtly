import {Dispatch, SetStateAction, useContext, useState} from 'react';
import AuthenticationService from '../../../../../services/Authentication.Service';
import {ServerContext} from '../../../../../contexts/ServerContext';

export const useSignUpAndAddServer = (): [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (codeRef?: string) => Promise<void>,
] => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const {add} = useContext(ServerContext);

  const signUp = (codeRef?: string) => {
    setLoading(true);
    if (!code && !codeRef) {
      return Promise.reject('no code!');
    }

    return AuthenticationService.signUp({
      deviceId: '',
      qrCode: codeRef || code,
    })
      .then((response) => {
        // todo get server info
        // todo set default server info

        // todo get /information/

        add({
          id: Math.random().toString(),
          url: 'FROM RESPONSE',
          name: 'FROM RESPONSE',
          authentication: {
            token: response.token,
          },
          configuration: {updateInterval: 5000},
        });

        console.log(response);
        setLoading(false);
        return AuthenticationService.login(response);
      })
      .catch((reason) => {
        console.error(reason);
        setCode('');
        setLoading(false);
        throw Error(reason);
      });
  };

  return [loading, code, setCode, signUp];
};
