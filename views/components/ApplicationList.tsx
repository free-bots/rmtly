import React from 'react';
import {Dimensions, FlatList, ListRenderItemInfo} from 'react-native';
import {ApplicationCard} from './ApplicationCard';
import ApplicationService from '../../services/Application.service';
import {ApplicationEntry} from '../../models/ApplicationEntry';

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
    return modulo !== 0 && index >= applications.length - modulo
      ? 1 / (numColumns + 5 / 100)
      : 1;
  };

  return (
    <>
      <FlatList
        refreshing={loading}
        horizontal={false}
        numColumns={numColumns}
        onRefresh={onRefresh}
        data={applications}
        style={{
          flex: 1,
        }}
        renderItem={(itemInfo: ListRenderItemInfo<ApplicationListEntry>) => (
          <ApplicationCard
            onPress={() => {
              onExecute(itemInfo.item);
            }}
            onLongPress={() => {
              onDetails(itemInfo.item);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: calculateFlex(marginColumn, itemInfo.index),
              margin: marginColumn,
              height: Dimensions.get('window').width / numColumns,
            }}
            name={itemInfo.item.name}
            icon={ApplicationService.getIcon(itemInfo.item.id)}
            loading={itemInfo.item.executing}
          />
        )}
        keyExtractor={(item, index) => item.id || String(index)}
      />
    </>
  );
};
