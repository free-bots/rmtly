import AuthenticationService from '../../../../services/Authentication.Service';
import {Dispatch, SetStateAction, useState} from 'react';

export const useSignUp = (): [
  string,
  Dispatch<SetStateAction<string>>,
  () => Promise<void>,
] => {
  const [code, setCode] = useState<string>('authenticationCode');

  const signUp = () => {
    if (!code) {
      return Promise.reject('no code!');
    }

    return AuthenticationService.signUp({
      deviceId: '',
      qrCode: code,
    })
      .then((response) => {
        console.log(response);
        return AuthenticationService.login(response);
      })
      .catch((reason) => {
        console.error(reason);
        setCode('');
        throw Error(reason);
      });
  };

  return [code, setCode, signUp];
};
