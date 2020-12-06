import React from 'react';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import {useSignUp} from './hooks/SignUpHook';

export const ServerAuthentication = ({navigation}: any) => {
  const [code, setCode, signUp] = useSignUp();

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
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Applications'}],
                  });
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
