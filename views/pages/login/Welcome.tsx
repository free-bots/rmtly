import {Image, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {BaseScreen} from '../base/BaseScreen';
import Button from '../../components/buttons/Button';
import {Surface} from 'react-native-paper';
import {ThemeContext} from '../../../contexts/ThemeContext';

export const Welcome = ({navigation}: any) => {
  const {isLightTheme, light, dark} = useContext(ThemeContext);
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
          <View
            style={{
              flex: 1,
              padding: 50,
              alignSelf: 'center',
            }}>
            <Surface
              style={{
                borderRadius: 100,
                height: 100,
                width: 100,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 40,
              }}>
              <Image
                style={{
                  tintColor: theme.colors.primary,
                }}
                source={require('../../../assets/robot-excited.png')}
              />
            </Surface>
          </View>
          <View
            style={{
              flex: 2,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: theme.colors.primary,
              }}>
              Welcome to rmtly
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
              }}>
              Let's get started by login in your pc
            </Text>
          </View>
          <Button
            onPress={() => {
              navigation.navigate('ServerConnection');
            }}>
            Login
          </Button>
        </View>
      </BaseScreen>
    </>
  );
};
