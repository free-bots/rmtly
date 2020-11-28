import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ConfigService} from '../../../services/Config.service';
import ConnectionService from './../../../services/Connection.service';
import AuthenticationService from './../../../services/Authentication.Service';

export const Connection = () => {
  const [url, setUrl] = useState<string>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const configUrl = ConfigService.getUrl();
    if (configUrl) {
      setUrl(configUrl);
    }

    const configToken = ConfigService.getToken();
    if (configToken) {
      setToken(configToken);
    }
  }, []);

  const testConnection = () => {
    ConnectionService.isRmtlyServerAvailable(url || '')
      .then((available) => {
        if (!available) {
          throw new Error();
        }

        console.log('success');
        ConfigService.setUrl(url || '').catch((error) => console.error(error));
      })
      .catch(() => {
        console.log('error');
      });
  };

  const createNewCode = () => {
    AuthenticationService.createCode().then(() => console.log('create code'));
  };

  const signUp = () => {
    AuthenticationService.signUp({
      deviceId: '',
      qrCode: 'authenticationCode',
    }).then((response) => {
      console.log(response);
      return AuthenticationService.login(response);
    });
  };

  const logout = () => {
    AuthenticationService.logOut();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View style={styles.body}>
          <Text>Address</Text>
          <TextInput
            multiline={false}
            value={url}
            onChangeText={(text) => {
              setUrl(text);
              ConfigService.setUrl(text).then(() => {
                console.log(text);
              });
            }}
          />
          <Button
            title={'Scan QR'}
            onPress={() => {
              console.log('todo open qr scanner');
            }}
          />
          <Button
            title={'Test connection'}
            onPress={() => {
              testConnection();
            }}
          />
          <Button
            title={'Create code'}
            onPress={() => {
              createNewCode();
            }}
          />
          <Button
            title={'SignUp'}
            onPress={() => {
              signUp();
            }}
          />
          <Button
            title={'Logout'}
            onPress={() => {
              logout();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#7e23e8',
    height: '100%',
  },
});
