import React from 'react';
import {FlatList, ListRenderItemInfo, Pressable} from 'react-native';
import {ApplicationCard} from './ApplicationCard';
import ApplicationService from '../../services/Application.service';
import {Action, ApplicationEntry} from '../../models/ApplicationEntry';

export class ApplicationListEntry extends ApplicationEntry {
  constructor(
    id: string,
    version: number,
    type: string,
    name: string,
    comment: string,
    tryExec: string,
    exec: string,
    icon: string,
    mimeType: string[],
    actions: Action[],
    categories: string[],
    executing: boolean,
  ) {
    super(
      id,
      version,
      type,
      name,
      comment,
      tryExec,
      exec,
      icon,
      mimeType,
      actions,
      categories,
    );
    this.executing = executing;
  }
  public executing: boolean;
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

  return (
    <>
      <FlatList
        refreshing={loading}
        horizontal={false}
        numColumns={numColumns}
        onRefresh={onRefresh}
        data={applications}
        renderItem={(itemInfo: ListRenderItemInfo<ApplicationListEntry>) => (
          <Pressable
            onPress={() => {
              onExecute(itemInfo.item);
            }}
            onLongPress={() => {
              onDetails(itemInfo.item);
            }}
            style={{
              flex: 1 / numColumns,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <ApplicationCard
              name={itemInfo.item.name}
              icon={ApplicationService.getIcon(itemInfo.item.id)}
              loading={itemInfo.item.executing}
            />
          </Pressable>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </>
  );
};
