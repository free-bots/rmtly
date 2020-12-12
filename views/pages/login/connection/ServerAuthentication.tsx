import React, {useContext} from 'react';
import {TextInput, View} from 'react-native';
import {useSignUp} from './hooks/SignUpHook';
import {LoginContext} from '../../../../contexts/LoginContext';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';

export const ServerAuthentication = () => {
  const [code, setCode, signUp] = useSignUp();

  const {loggedIn} = useContext(LoginContext);

  return (
    <>
      <BaseScreen>
        <View>
          <Button
            onPress={() => {
              console.log('todo open qr scanner');
            }}>
            Scan QR
          </Button>
          <TextInput
            placeholder={'code'}
            value={code}
            onChangeText={(text) => {
              setCode(text);
            }}
          />
          <Button
            onPress={() => {
              signUp()
                .then(() => {
                  console.log('success');
                  loggedIn();
                })
                .catch(() => {
                  // state is cleared
                  // try again
                });
            }}>
            SignUp
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
