import {Alert, Image, View} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';
import {useConnectWithServer} from './hooks/ConnectWithServerHook';

export const ServerAuthenticationQr = ({route, navigation}: any) => {
  let qr: QRCodeScanner | null;

  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [loading, code, setCode, addServer] = useConnectWithServer();
  const {url} = route.params;


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
            addServer(url, data)
              .then((serverSize) => {
                if (serverSize > 1) {
                  navigation.navigate('ServerList');
                }
                console.log('success');
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
