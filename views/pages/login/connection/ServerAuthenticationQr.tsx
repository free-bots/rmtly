import {Alert, Image, View} from 'react-native';
import React, {useContext, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useSignUp} from './hooks/SignUpHook';
import {LoginContext} from '../../../../contexts/LoginContext';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';

export const ServerAuthenticationQr = () => {
  let qr: QRCodeScanner | null;

  const [camera, setCamera] = useState<'back' | 'front'>('back');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, code, setCode, signUp] = useSignUp();

  const {loggedIn} = useContext(LoginContext);

  const toggleCamera = () => {
    setCamera(camera === 'back' ? 'front' : 'back');
  };

  const onCode = (qrRef: QRCodeScanner, data: string) => {
    Alert.alert(
      'Scanned QR code',
      `Is ${data} your code?`,
      [
        {
          text: 'Yes',
          onPress: () => {
            signUp(data)
              .then(() => {
                loggedIn();
              })
              .catch(() => {
                qrRef.reactivate();
              });
          },
        },
        {
          text: 'No',
          onPress: () => {
            setCode('');
            qrRef.reactivate();
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
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <QRCodeScanner
            ref={(node) => (qr = node)}
            topViewStyle={{
              flex: 1,
            }}
            cameraProps={{
              autoFocus: 'on',
              // barCodeTypes: ['qr'],
            }}
            cameraType={camera}
            showMarker={true}
            vibrate={true}
            onRead={(e) => {
              console.log(e);
              if (qr) {
                onCode(qr, e.data);
              }
            }}
          />
          <Button
            icon={({size, color}: {size: number; color: string}) => (
              <Image
                source={require('../../../../assets/camera-flip.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            )}
            onPress={() => toggleCamera()}>
            Flip Camera
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
