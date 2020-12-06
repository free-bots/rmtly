import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSignUp} from './hooks/SignUpHook';

export const ServerAuthenticationQr = ({navigation}: any) => {
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [code, setCode, signUp] = useSignUp();

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
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Applications'}],
                });
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
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <Button
          title={code}
          onPress={() => {
            onCode('test');
          }}
        />
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
        <Button title={'back'} onPress={() => setCamera('back')} />
        <Button title={'front'} onPress={() => setCamera('front')} />
      </SafeAreaView>
    </>
  );
};
