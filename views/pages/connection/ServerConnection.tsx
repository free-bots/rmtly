import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StatusBar, TextInput, View} from 'react-native';
import {ConfigService} from '../../../services/Config.service';
import ConnectionService from '../../../services/Connection.service';
import AuthenticationService from './../../../services/Authentication.Service';

export const ServerConnection = ({navigation}: any) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const configUrl = ConfigService.getUrl();
    if (configUrl) {
      setUrl(configUrl);
    }
  }, []);

  const testConnectionAndNavigate = async () => {
    try {
      const available = await ConnectionService.isRmtlyServerAvailable(
        url || '',
      );
      if (!available) {
        throw new Error();
      }

      await ConfigService.setUrl(url || '');

      await AuthenticationService.createCode();

      navigateToAuthentication();
    } catch (error) {
      setUrl('');
      console.error(error);
    }
  };

  const navigateToAuthentication = () => {
    navigation.navigate('ServerAuthentication');
  };

  const navigateToQr = () => {
    navigation.navigate('ServerAuthenticationQr');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View>
          <Button title={'test'} onPress={() => navigateToQr()} />
          <TextInput
            placeholder={'URL'}
            onChangeText={(text) => {
              setUrl(text);
            }}
            value={url}
          />
          <Button
            title={'Login'}
            onPress={() => {
              testConnectionAndNavigate();
            }}
          />
          <Button
            title={'logOut'}
            onPress={() => {
              AuthenticationService.logOut();
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
