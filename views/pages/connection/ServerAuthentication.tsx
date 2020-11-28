import React, {useState} from 'react';
import AuthenticationService from './../../../services/Authentication.Service';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';

export const ServerAuthentication = () => {
  const [code, setCode] = useState<string>();

  const signUp = () => {
    AuthenticationService.signUp({
      deviceId: '',
      qrCode: 'authenticationCode',
    })
      .then((response) => {
        console.log(response);
        return AuthenticationService.login(response);
      })
      .catch((reason) => {
        console.error(reason);
        setCode('');
      });
  };

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
              signUp();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
