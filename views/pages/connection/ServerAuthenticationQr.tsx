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

export const ServerAuthenticationQr = () => {
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [code, setCode] = useState<string>('');

  const onCode = (data: string) => {
    Alert.alert(
      'Scanned QR code',
      `Is ${data} your code?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            setCode(data);
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
