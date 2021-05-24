/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {SortedApplicationResponse, SortedValue, SortKey} from '../../../../models/Response.model';
import {List} from 'react-native-paper';
import {BaseScreen} from '../../base/BaseScreen';
import {ThemeContext} from '../../../../contexts/ThemeContext';
import {LoginContext} from '../../../../contexts/LoginContext';
import {Empty} from '../../../components/Empty';
import {ApplicationContext} from '../../../../services/ApplicationContext';
import {useFocusEffect} from '@react-navigation/native';
import {ServerContext} from '../../../../contexts/ServerContext';

export const CategoriesScreen = ({navigation}: any) => {
  const [sortedApplications, setSortedApplications] = useState<SortedApplicationResponse>();

  const [loading, setLoading] = useState(false);
  const {isAuthenticated} = useContext(LoginContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {sortApplicationBy} = useContext(ApplicationContext);
  const {serverState} = useContext(ServerContext);

  useFocusEffect(
    useCallback(() => {
      let interval: any = null;

      if (isAuthenticated) {
        fetchApplicationsSortedByCategory(serverState.currentServer?.id as any);

        interval = setInterval(fetchApplicationsSortedByCategory, 10000, serverState.currentServer?.id);
      }

      return () => {
        clearInterval(interval);
      };
    }, [isAuthenticated, sortApplicationBy, serverState]),
  );

  const onRefresh = () => {
    fetchApplicationsSortedByCategory(serverState.currentServer?.id as any);
  };

  const fetchApplicationsSortedByCategory = (serverId: string) => {
    setLoading(true);
    sortApplicationBy(SortKey.CATEGORY)
      .then((fetchedApplications) => {
        if (serverState.currentServer?.id !== serverId) {
          setLoading(false);
          return;
        }
        fetchedApplications.values.sort((a, b) => a.sortedValue.localeCompare(b.sortedValue));
        if (isAuthenticated) {
          setLoading(false);
          setSortedApplications(fetchedApplications);
        }
      })
      .catch((error) => {
        console.error(error);
        if (isAuthenticated) {
          setLoading(false);
        }
      });
  };

  const navigateToCategory = (sortedValue: SortedValue) => {
    console.log(sortedValue);
    navigation.navigate('Category', {
      category: {
        title: sortedValue.sortedValue,
        applications: sortedValue.applicationEntries,
      },
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
            contentContainerStyle={sortedApplications?.values?.length ? {} : {flex: 1}}
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
            data={sortedApplications?.values}
            renderItem={(info: ListRenderItemInfo<SortedValue>) => (
              <View>
                <List.Item
                  title={info.item.sortedValue}
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
                    navigateToCategory(info.item);
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.sortedValue || String(index)}
          />
        </View>
      </BaseScreen>
    </>
  );
};
