import React, {useContext} from 'react';
import {Dimensions, FlatList, ListRenderItemInfo, View} from 'react-native';
import {ApplicationCard} from './ApplicationCard';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {Empty} from './Empty';
import {ApplicationContext} from '../../services/ApplicationContext';
import {ServerContext} from '../../contexts/ServerContext';
import {Server} from '../../models/persistence/Server';

export interface ApplicationListEntry extends ApplicationEntry {
  executing: boolean;
}

export const ApplicationList = ({
  onExecute,
  onDetails,
  onRefresh,
  loading,
  applications,
}: {
  onDetails: (application: ApplicationEntry) => void;
  onExecute: (application: ApplicationEntry) => void;
  onRefresh: () => void;
  loading: boolean;
  applications: ApplicationListEntry[];
}) => {
  const numColumns = 3;
  const marginColumn = 5;

  const calculateFlex = (margin: number, index: number) => {
    const modulo = applications.length % numColumns;
    return modulo !== 0 && index >= applications.length - modulo ? 1 / (numColumns + 5 / 100) : 1;
  };

  const {getIcon} = useContext(ApplicationContext);
  const {serverState} = useContext(ServerContext);

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          contentContainerStyle={applications.length ? {} : {flex: 1}}
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
          horizontal={false}
          numColumns={numColumns}
          onRefresh={onRefresh}
          data={applications.map((application) => ({
            application,
            server: serverState.currentServer,
          }))}
          style={{
            flex: 1,
          }}
          renderItem={(itemInfo: ListRenderItemInfo<{application: ApplicationListEntry; server: Server | null}>) => (
            <ApplicationCard
              onPress={() => {
                onExecute(itemInfo.item.application);
              }}
              onLongPress={() => {
                onDetails(itemInfo.item.application);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: calculateFlex(marginColumn, itemInfo.index),
                margin: marginColumn,
                height: Dimensions.get('window').width / numColumns,
              }}
              name={itemInfo.item.application.name}
              icon={getIcon(itemInfo.item.application.id, itemInfo.item.server?.url)}
              loading={itemInfo.item.application.executing}
            />
          )}
          keyExtractor={(item, index) => `${item.application.id}@${serverState.currentServer?.id}` || String(index)}
        />
      </View>
    </>
  );
};
