/* eslint-disable react-hooks/exhaustive-deps */
import {ActivityIndicator, FlatList, ListRenderItemInfo, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {List} from 'react-native-paper';
import {BaseScreen} from '../../base/BaseScreen';
import {ThemeContext} from '../../../../contexts/ThemeContext';
import {LoginContext} from '../../../../contexts/LoginContext';
import {Empty} from '../../../components/Empty';
import {useFocusEffect} from '@react-navigation/native';
import {ServerContext} from '../../../../contexts/ServerContext';
import {ConnectivityContext} from '../../../../contexts/ConnectivityContext';
import {ScriptContext} from '../../../../contexts/ScriptContext';
import {ScriptEntry} from '../../../../models/ScriptEntry';

interface LoadingScriptEntry {
  script: ScriptEntry;
  loading: boolean;
}

export const ScriptsScreen = ({navigation}: any) => {
  const [scripts, setScripts] = useState<LoadingScriptEntry[]>();

  const [loading, setLoading] = useState(false);
  const {isAuthenticated} = useContext(LoginContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {serverState} = useContext(ServerContext);
  const {offline} = useContext(ConnectivityContext);
  const {getAllScripts, executeScript} = useContext(ScriptContext);

  useFocusEffect(
    useCallback(() => {
      let interval: any = null;

      if (isAuthenticated) {
        fetchScripts(serverState.currentServer?.id as any);

        interval = setInterval(fetchScripts, 10000, serverState.currentServer?.id);
      }

      return () => {
        clearInterval(interval);
      };
    }, [isAuthenticated, getAllScripts, serverState]),
  );

  const onRefresh = () => {
    fetchScripts(serverState.currentServer?.id as any);
  };

  const fetchScripts = (serverId: string) => {
    if (offline) {
      return;
    }

    setLoading(true);
    getAllScripts()
      .then((fetchedScripts) => {
        if (serverState.currentServer?.id !== serverId) {
          setLoading(false);
          return;
        }
        if (isAuthenticated) {
          setLoading(false);
          setScripts((prevState) =>
            fetchedScripts.map((fetchedScript) => {
              const existingScript = prevState?.find(
                (currentScript) => currentScript.script?.name === fetchedScript.name,
              );

              if (existingScript) {
                return {...existingScript, script: fetchedScript};
              }

              return {script: fetchedScript, loading: false};
            }),
          );
        }
      })
      .catch((error) => {
        console.error(error);
        if (isAuthenticated) {
          setLoading(false);
        }
      });
  };

  const execute = (script: ScriptEntry) => {
    // on long click -> bottomsheet
    setScripts((prevState) =>
      prevState?.map((currentScript) => {
        if (currentScript.script.name === script.name) {
          return {...currentScript, loading: true};
        }
        return currentScript;
      }),
    );

    executeScript(script.name, {
      executeDelay: 0,
    })
      .then(() => {
        setScripts((prevState) =>
          prevState?.map((currentScript) => {
            if (currentScript.script.name === script.name) {
              return {...currentScript, loading: false};
            }
            return currentScript;
          }),
        );
      })
      .catch((error) => {
        console.error(error);
        if (isAuthenticated) {
          setScripts((prevState) =>
            prevState?.map((currentScript) => {
              if (currentScript.script.name === script.name) {
                return {...currentScript, loading: false};
              }
              return currentScript;
            }),
          );
        }
      });
  };

  return (
    <>
      <BaseScreen>
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            contentContainerStyle={scripts?.length ? {} : {flex: 1}}
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
              onRefresh();
            }}
            data={scripts}
            renderItem={(info: ListRenderItemInfo<LoadingScriptEntry>) => (
              <View>
                <List.Item
                  title={info.item.script?.name}
                  description={info.item.script?.description}
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
                    info.item.loading ? (
                      <ActivityIndicator
                        size={'large'}
                        color={theme.colors.primary}
                        style={{
                          alignSelf: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    ) : null
                  }
                  onPress={() => {
                    execute(info.item.script);
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => item?.script?.name || String(index)}
          />
        </View>
      </BaseScreen>
    </>
  );
};
