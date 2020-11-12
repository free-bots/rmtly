import React, {useEffect, useState} from 'react';
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
  onDetails,
}: {
  onDetails: (application: ApplicationEntry) => void;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [applications, setApplications] = useState<ApplicationListEntry[]>([]);

  const fetchApplications = () => {
    setRefreshing(true);
    ApplicationService.getAllApplications()
      .then((fetchedApplications) => {
        setApplications(transformExecution(fetchedApplications, false));
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };

  const transformExecution = (
    source: ApplicationListEntry[] | ApplicationEntry[],
    executing: boolean,
  ): ApplicationListEntry[] => {
    return (source as any).map(
      (application: ApplicationEntry | ApplicationListEntry) => ({
        ...application,
        executing: executing,
      }),
    );
  };

  const setExecuting = (applicationId: string, executing: boolean) => {
    setApplications(
      applications.map((iterateApplication) => {
        iterateApplication.executing = !executing;

        if (iterateApplication.id === applicationId) {
          iterateApplication.executing = executing;
        }
        return iterateApplication;
      }),
    );
  };

  const execute = (application: ApplicationEntry) => {
    setExecuting(application.id, true);
    ApplicationService.executeApplication(application.id, {executeDelay: 0})
      .then(() => {
        setApplications(transformExecution(applications, false));
      })
      .catch((error) => {
        setApplications(transformExecution(applications, false));
        console.error(error);
      });
  };

  const onRefresh = () => {
    fetchApplications();
  };

  const onLongPress = (application: ApplicationEntry) => {
    console.log('application list long press');
    onDetails(application);
  };

  useEffect(() => {
    fetchApplications();

    const refreshInterval = setInterval(() => {
      fetchApplications();
    }, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const numColumns = 3;

  return (
    <>
      <FlatList
        refreshing={refreshing}
        horizontal={false}
        numColumns={numColumns}
        onRefresh={onRefresh}
        data={applications}
        renderItem={(itemInfo: ListRenderItemInfo<ApplicationListEntry>) => (
          <Pressable
            onPress={() => {
              execute(itemInfo.item);
            }}
            onLongPress={() => {
              onLongPress(itemInfo.item);
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
