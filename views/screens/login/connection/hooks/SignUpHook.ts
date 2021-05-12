import AuthenticationService from '../../../../../services/Authentication.Service';
import {Dispatch, SetStateAction, useState} from 'react';

export const useSignUp = (): [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  (codeRef?: string) => Promise<void>,
] => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

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
