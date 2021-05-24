import React, {useContext, useState} from 'react';
import {BaseScreen} from '../base/BaseScreen';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {Empty} from '../../components/Empty';
import {Chip, FAB, List} from 'react-native-paper';
import {Server} from '../../../models/persistence/Server';
import {LoginContext} from '../../../contexts/LoginContext';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {ServerContext} from '../../../contexts/ServerContext';
import {ScrollDirection, useScrollDirection} from '../../../utils/ScrollDirectionHandlerHook';

export const ServerList = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const {isAuthenticated} = useContext(LoginContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {serverState} = useContext(ServerContext);

  const scrollDirectionHandler = (direction: ScrollDirection) => {
    setFabVisible(direction === ScrollDirection.UP);
  };

  const [onScroll] = useScrollDirection(scrollDirectionHandler);

  const navigateToServer = (server: Server) => {
    console.log(server);
    navigation.navigate('ConnectionInfo', {
      server: server,
    });
  };

  const navigateToAddNewServer = () => {
    navigation.navigate('ServerConnection');
  };

  const [fabVisible, setFabVisible] = useState<boolean>(true);

  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            // scrollEventThrottle={16}
            onScroll={(event) => {
              onScroll(event);
            }}
            contentContainerStyle={serverState.servers?.length ? {} : {flex: 1}}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Empty />
              </View>
            )}
            refreshing={loading}
            onRefresh={() => {
              // onRefresh();
            }}
            data={serverState.servers}
            renderItem={(info: ListRenderItemInfo<Server>) => (
              <View>
                <List.Item
                  title={info.item.name}
                  description={`Url: ${info.item.url}`}
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
                  right={() =>
                    info.item.id === serverState.currentServer?.id ? (
                      <Chip
                        icon="information"
                        style={{
                          height: '60%',
                          alignSelf: 'center',
                        }}>
                        Current
                      </Chip>
                    ) : null
                  }
                  onPress={() => {
                    navigateToServer(info.item);
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => item?.id || String(index)}
          />
          <FAB
            theme={{...theme, colors: {accent: theme.colors.primary}}}
            visible={fabVisible}
            label={'add server'}
            style={{
              position: 'absolute',
              bottom: 0,
              margin: 16,
              alignSelf: 'center',
            }}
            icon="plus"
            onPress={() => navigateToAddNewServer()}
          />
        </View>
      </BaseScreen>
    </>
  );
};
