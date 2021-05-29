import React, {createRef, useContext} from 'react';
import {BaseScreen} from '../../base/BaseScreen';
import {View} from 'react-native';
import {Card, Paragraph, Text} from 'react-native-paper';
import Button from '../../../components/buttons/Button';
import {ThemeContext} from '../../../../contexts/ThemeContext';
import {ServerContext} from '../../../../contexts/ServerContext';
import {Server} from '../../../../models/persistence/Server';
import {Dialog} from '../../../components/dialogs/Dialog';

export const ConnectionInfo = ({route, navigation}: any) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {deleteById, setCurrentServer, serverState} = useContext(ServerContext);

  const server: Server = route.params?.server;

  const dialogRef: any = createRef<typeof Dialog>();

  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Card style={{margin: 5}}>
            <Card.Title title={'Informations'} />
            <Card.Content>
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                Url:
              </Text>
              <Text>{server?.url}</Text>
              <View style={{margin: 5}} />
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                AuthCode:
              </Text>
              <Text>{server?.authentication?.token}</Text>
            </Card.Content>
          </Card>

          <Button
            onPress={() => {
              setCurrentServer(server.id);
            }}>
            Set the current server
          </Button>

          <Button
            onPress={() => {
              dialogRef.current?.showDialog();
            }}>
            Logout
          </Button>
          <Dialog
            ref={dialogRef}
            title={'hi'}
            content={<Paragraph>Do you want to delete the server connection?</Paragraph>}
            actions={[
              {
                onPress: () => {},
                title: 'No',
              },
              {
                onPress: () => {
                  deleteById(server.id).then(() => {
                    if (serverState.servers?.length > 0) {
                      navigation.goBack();
                    }
                  });
                },
                title: 'Yes',
              },
            ]}
          />
        </View>
      </BaseScreen>
    </>
  );
};
