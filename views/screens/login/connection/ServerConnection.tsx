import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import ConnectionService from '../../../../services/Connection.service';
import AuthenticationService from '../../../../services/Authentication.Service';
import Button from '../../../components/buttons/Button';
import TextInput from '../../../components/TextInputs/TextInput';
import {BaseScreen} from '../../base/BaseScreen';
import {ServerContext} from '../../../../contexts/ServerContext';
import {Snackbar} from 'react-native-paper';
import {Server} from '../../../../models/persistence/Server';

export const ServerConnection = ({navigation}: any) => {
  const [url, setUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [duplicateServer, setDuplicateServer] = useState<Server | null>(null);

  const {serverState} = useContext(ServerContext);

  const testConnectionAndNavigate = async () => {
    setLoading(true);
    try {
      const available = await ConnectionService.isRmtlyServerAvailable(url || '');
      if (!available || !url) {
        throw new Error();
      }

      await AuthenticationService.createCode(url);

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

              const server = serverState.servers.find((server) => server.url === text) || null;
              setDuplicateServer(server);
            }}
            value={url}
          />
          <Button
            disabled={duplicateServer}
            loading={loading}
            onPress={() => {
              testConnectionAndNavigate();
            }}>
            Login
          </Button>
        </View>
      </BaseScreen>
      <Snackbar
        visible={duplicateServer !== null}
        duration={5000}
        action={
          duplicateServer
            ? {
                label: 'Manage',
                onPress: () => {
                  navigation.navigate('ConnectionInfo', {
                    server: duplicateServer,
                  });
                },
              }
            : undefined
        }
        onDismiss={() => {}}>
        Server connection exists :(
      </Snackbar>
    </>
  );
};
