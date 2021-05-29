import {Image, View} from 'react-native';
import React, {createRef, RefObject, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from '../../../components/buttons/Button';
import {BaseScreen} from '../../base/BaseScreen';
import {useConnectWithServer} from './hooks/ConnectWithServerHook';
import {Dialog} from '../../../components/dialogs/Dialog';
import {Paragraph} from 'react-native-paper';
import {LoadingOverlay} from '../../../components/loading/LoadingOverlay';

export const ServerAuthenticationQr = ({route, navigation}: any) => {
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [loading, code, setCode, addServer] = useConnectWithServer();
  const {url} = route.params;

  const dialogRef: any = createRef<typeof Dialog>();

  const qrRef: RefObject<QRCodeScanner> = createRef();

  const toggleCamera = () => {
    setCamera(camera === 'back' ? 'front' : 'back');
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
            ref={qrRef}
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
              dialogRef.current?.showDialog(e.data);
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
          <Dialog
            ref={dialogRef}
            title={'Scanned QR code'}
            content={(qrCode) => <Paragraph>Is "{qrCode}" your code?</Paragraph>}
            actions={[
              {
                onPress: () => {
                  setCode('');
                  qrRef.current?.reactivate();
                },
                title: 'No',
              },
              {
                onPress: (qrCode: string) => {
                  console.log(`got code ${qrCode}`);
                  addServer(url, qrCode)
                    .then((serverSize) => {
                      if (serverSize > 1) {
                        navigation.navigate('ServerList');
                      }
                      console.log('success');
                    })
                    .catch(() => {
                      qrRef.current?.reactivate();
                    });
                },
                title: 'Yes',
              },
            ]}
          />
          {loading && <LoadingOverlay />}
        </View>
      </BaseScreen>
    </>
  );
};
