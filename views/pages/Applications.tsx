import React, {createRef, useEffect, useState} from 'react';
import {
  ApplicationList,
  ApplicationListEntry,
} from '../components/ApplicationList';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {ApplicationBottomSheet} from '../components/ApplicationBottomSheet';
import ApplicationService from '../../services/Application.service';
import {BaseScreen} from './base/BaseScreen';
import {Searchbar, Surface} from 'react-native-paper';

export const Applications = ({route}: any) => {
  const category = route.params?.category as {
    title: string;
    applications: ApplicationEntry[];
  };
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationListEntry[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (category) {
      setApplications(transformExecution(category.applications, false));
      return;
    }

    fetchApplications();

    const refreshInterval = setInterval(() => {
      fetchApplications();
    }, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const equalsOrInclude = (a: string, b: string): boolean => {
    if (!a || !b) {
      return true;
    }
    a = a.toLocaleLowerCase();
    b = b.toLocaleLowerCase();
    return a.includes(b);
  };

  const filterBySearch = (
    unfilteredApplications: ApplicationListEntry[],
    filter: string,
  ) => {
    return unfilteredApplications.filter((currentApplication) =>
      [
        equalsOrInclude(currentApplication.id, filter),
        equalsOrInclude(currentApplication.name, filter),
      ].reduce((previousValue, currentValue) => previousValue || currentValue),
    );
  };

  const applicationButtonSheetRef: any = createRef<ApplicationBottomSheet>();

  const openApplicationDetails = (application: ApplicationEntry) => {
    applicationButtonSheetRef.current?.open(application);
  };

  const fetchApplications = () => {
    setLoading(true);
    ApplicationService.getAllApplications()
      .then((fetchedApplications) => {
        setApplications(transformExecution(fetchedApplications, false));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setApplications([]);
        setLoading(false);
      });
  };

  const transformExecution = (
    source: ApplicationListEntry[] | ApplicationEntry[],
    executing: boolean,
  ): ApplicationListEntry[] => {
    source.sort((a, b) => a.name.localeCompare(b.name));
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
    if (category) {
      return;
    }

    fetchApplications();
  };

  return (
    <>
      <BaseScreen>
        <ApplicationList
          loading={loading}
          onRefresh={() => {
            onRefresh();
          }}
          onExecute={(application: ApplicationEntry) => {
            execute(application);
          }}
          onDetails={(application: ApplicationEntry) => {
            openApplicationDetails(application);
          }}
          applications={filterBySearch(applications, search)}
        />
        <Surface
          style={{
            backgroundColor: 'gray',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 7,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 4,
          }}>
          <Searchbar
            placeholder="Search"
            onChangeText={(text: string) => {
              setSearch(text);
            }}
            value={search}
          />
        </Surface>
        <ApplicationBottomSheet ref={applicationButtonSheetRef} />
      </BaseScreen>
    </>
  );
};
