import React from 'react';
import {View} from 'react-native';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';
import TextInput from '../../../components/TextInputs/TextInput';
import {Text} from 'react-native-paper';
import {useConnectWithServer} from './hooks/ConnectWithServerHook';

export const ServerAuthentication = ({route, navigation}: any) => {
  const [loading, code, setCode, addServer] = useConnectWithServer();

  const {url} = route.params;

  const navigateToQr = () => {
    navigation.navigate('ServerAuthenticationQr', {url});
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
          <View>
            <TextInput
              label={'Code'}
              placeholder={'code'}
              mode={'outlined'}
              value={code}
              onChangeText={(text: string) => {
                setCode(text);
              }}
            />
            <Text
              style={{
                margin: 20,
                textAlign: 'center',
              }}>
              OR
            </Text>
            <Button
              onPress={() => {
                navigateToQr();
              }}>
              Scan QR
            </Button>
          </View>
          <Button
            loading={loading}
            onPress={() => {
              addServer(url)
                .then((serverSize) => {
                  if (serverSize > 1) {
                    navigation.navigate('ServerList');
                  }
                  console.log('success');
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
