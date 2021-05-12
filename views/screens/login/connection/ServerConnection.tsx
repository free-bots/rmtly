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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const configUrl = ConfigService.getUrl();
    if (configUrl) {
      setUrl(configUrl);
    }
  }, []);

  const testConnectionAndNavigate = async () => {
    setLoading(true);
    try {
      const available = await ConnectionService.isRmtlyServerAvailable(url || '');
      if (!available) {
        throw new Error();
      }

      await AuthenticationService.createCode();

      navigateToAuthentication();
    } catch (error) {
      setUrl('');
      console.error(error);
    }
    setLoading(false);
  };

  const navigateToAuthentication = () => {
    navigation.navigate('ServerAuthentication', {url: url});
  };

  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
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
            loading={loading}
            onPress={() => {
              testConnectionAndNavigate();
            }}>
            Login
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
