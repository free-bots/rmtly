import {Alert, Text, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSignUp} from './hooks/SignUpHook';
import {LoginContext} from '../../../../contexts/LoginContext';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';

export const ServerAuthenticationQr = () => {
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [code, setCode, signUp] = useSignUp();

  const {loggedIn} = useContext(LoginContext);

  const onCode = (data: string) => {
    Alert.alert(
      'Scanned QR code',
      `Is ${data} your code?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            signUp()
              .then(() => {
                loggedIn();
              })
              .catch(() => {
                // state is cleared
                // try again
              });
            // navigate
          },
        },
        {
          text: 'No',
          onPress: () => {
            setCode('');
            // retry scan
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  return (
    <>
      <BaseScreen>
        <Button
          onPress={() => {
            onCode('test');
          }}>
          {code}
        </Button>
        <QRCodeScanner
          cameraProps={{
            autoFocus: 'on',
            // barCodeTypes: ['qr'],
          }}
          cameraType={camera}
          showMarker={true}
          vibrate={true}
          onRead={(e) => {
            console.log(e);
            onCode(e.data);
          }}
          topContent={<Text>Top content</Text>}
          bottomContent={
            <TouchableOpacity>
              <Text>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
        <Button onPress={() => setCamera('back')}>Back</Button>
        <Button onPress={() => setCamera('front')}>Front</Button>
      </BaseScreen>
    </>
  );
};
