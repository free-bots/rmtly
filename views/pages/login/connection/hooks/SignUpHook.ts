import AuthenticationService from '../../../../../services/Authentication.Service';
import {Dispatch, SetStateAction, useState} from 'react';

export const useSignUp = (): [
  boolean,
  string,
  Dispatch<SetStateAction<string>>,
  () => Promise<void>,
] => {
  const [code, setCode] = useState<string>('authenticationCode');
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = () => {
    setLoading(true);
    if (!code) {
      return Promise.reject('no code!');
    }

    return AuthenticationService.signUp({
      deviceId: '',
      qrCode: code,
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
