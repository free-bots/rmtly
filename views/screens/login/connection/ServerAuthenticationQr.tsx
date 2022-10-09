import {Image, View} from 'react-native';
import React, {createRef, useEffect, useState} from 'react';
import {BaseScreen} from '../../base/BaseScreen';
import {useConnectWithServer} from './hooks/ConnectWithServerHook';
import {Dialog} from '../../../components/dialogs/Dialog';
import {LoadingOverlay} from '../../../components/loading/LoadingOverlay';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {Button, Paragraph, Snackbar} from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

export const ServerAuthenticationQr = ({route, navigation}: any) => {
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [loading, code, setCode, addServer] = useConnectWithServer();
  const {url} = route.params;

  const dialogRef: any = createRef<typeof Dialog>();

  const toggleCamera = () => {
    setCamera(camera === 'back' ? 'front' : 'back');
  };

  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const isFocused = useIsFocused();

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermission().then(status => {
      console.log(status);
      setHasPermission(status === 'authorized');
    }).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (dialogRef.current?.isVisible()) {
      return;
    }

    if (barcodes?.length) {
      dialogRef.current?.showDialog(barcodes[0]?.displayValue);
    }
  }, [barcodes]);

  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          {!!devices[camera] && hasPermission && (
            <>
              <Camera
                style={{
                  flex: 1,
                }}
                device={devices[camera] as any}
                isActive={isFocused}
                frameProcessor={frameProcessor}
                frameProcessorFps={5}
              />
            </>
          )}
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
                      setShowError(true)
                      setTimeout(() => {
                        if (isFocused) {
                          setShowError(false)
                        }
                      } , 3000)
                    });
                },
                title: 'Yes',
              },
            ]}
          />
          <Snackbar
            onDismiss={() => setShowError(false)}
            visible={showError}>
            Something went wrong :(
          </Snackbar>
          {loading && <LoadingOverlay/>}
        </View>
      </BaseScreen>
    </>
  );
};
