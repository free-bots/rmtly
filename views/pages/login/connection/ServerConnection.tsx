import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ConfigService} from '../../../../services/Config.service';
import ConnectionService from '../../../../services/Connection.service';
import AuthenticationService from '../../../../services/Authentication.Service';
import Button from '../../../components/buttons/Button';
import TextInput from '../../../components/TextInputs/TextInput';
import {BaseScreen} from '../../base/BaseScreen';

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
      <BaseScreen>
        <View>
          <Button onPress={() => navigateToQr()}>Test</Button>
          <TextInput
            label={'URL'}
            mode={'outlined'}
            placeholder={'URL'}
            onChangeText={(text: string) => {
              setUrl(text);
            }}
            value={url}
          />
          <Button
            onPress={() => {
              testConnectionAndNavigate();
            }}>
            Login
          </Button>
          <Button
            onPress={() => {
              AuthenticationService.logOut();
            }}>
            logOut
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
