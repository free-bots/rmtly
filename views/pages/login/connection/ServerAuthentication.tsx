import React, {useContext} from 'react';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import {useSignUp} from './hooks/SignUpHook';
import {LoginContext} from '../../../../contexts/LoginContext';

export const ServerAuthentication = () => {
  const [code, setCode, signUp] = useSignUp();

  const {loggedIn} = useContext(LoginContext);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View>
          <Button
            title={'Scan QR'}
            onPress={() => {
              console.log('todo open qr scanner');
            }}
          />
          <TextInput
            placeholder={'code'}
            value={code}
            onChangeText={(text) => {
              setCode(text);
            }}
          />
          <Button
            title={'SignUp'}
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
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
