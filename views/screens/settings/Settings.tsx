import React, {useContext} from 'react';
import {BaseScreen} from '../base/BaseScreen';
import {View} from 'react-native';
import {Card, List, Text} from 'react-native-paper';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {ServerContext} from '../../../contexts/ServerContext';

export const Settings = ({navigation}: any) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {serverState} = useContext(ServerContext);

  const navigateToServerList = () => {
    navigation.navigate('ServerList');
  };

  return (
    <>
      <BaseScreen>
        <View>
          <List.Item
            title={`Connected Servers: ${serverState.servers.length}`}
            description={'Click to manage a singe server'}
            left={(props) => (
              <List.Icon
                {...props}
                icon="file-tree-outline"
                style={{
                  borderRadius: 100,
                  backgroundColor: theme.colors.primary,
                }}
              />
            )}
            onPress={() => {
              navigateToServerList();
            }}
          />
        </View>
      </BaseScreen>
    </>
  );
};
