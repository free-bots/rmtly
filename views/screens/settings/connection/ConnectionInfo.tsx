import React, {useContext} from 'react';
import {BaseScreen} from '../../base/BaseScreen';
import {View} from 'react-native';
import {ConfigService} from '../../../../services/Config.service';
import {Card, Text} from 'react-native-paper';
import Button from '../../../components/buttons/Button';
import AuthenticationService from '../../../../services/Authentication.Service';
import {ThemeContext} from '../../../../contexts/ThemeContext';

export const ConnectionInfo = () => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

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
              <Text>{ConfigService.getUrl()}</Text>
              <View style={{margin: 5}} />
              <Text
                style={{
                  color: theme.colors.primary,
                }}>
                AuthCode:
              </Text>
              <Text>{ConfigService.getToken()}</Text>
            </Card.Content>
          </Card>

          <Button
            onPress={() => {
              AuthenticationService.logOut();
            }}>
            Logout
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
