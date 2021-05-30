/* eslint-disable react-hooks/exhaustive-deps */
import React, {createRef, useCallback, useContext, useEffect, useState} from 'react';
import {ApplicationList, ApplicationListEntry} from '../../components/ApplicationList';
import {ApplicationEntry} from '../../../models/ApplicationEntry';
import ApplicationBottomSheet from '../../components/ApplicationBottomSheet';
import {BaseScreen} from '../base/BaseScreen';
import {Searchbar, Surface} from 'react-native-paper';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {LoginContext} from '../../../contexts/LoginContext';
import {ApplicationContext} from '../../../services/ApplicationContext';
import {ServerContext} from '../../../contexts/ServerContext';
import {useFocusEffect} from '@react-navigation/native';
import {ConnectivityContext} from '../../../contexts/ConnectivityContext';

export const ApplicationsScreen = ({route}: any) => {
  const category = route.params?.category as {
    title: string;
    applications: ApplicationEntry[];
  };
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationListEntry[]>([]);
  const [search, setSearch] = useState<string>('');
  const {isAuthenticated} = useContext(LoginContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const {getAllApplications, executeApplication} = useContext(ApplicationContext);

  const {serverState} = useContext(ServerContext);
  const {offline} = useContext(ConnectivityContext);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect Application');
      console.log(`ìsAuthenticated: ${isAuthenticated}`);
      if (category) {
        console.log(category.applications.length);
        setApplications(transformExecution(category.applications, false));
        return;
      }

      let refreshInterval: any = null;

      const server = serverState.currentServer;
      if (isAuthenticated) {
        fetchApplications(server?.id as any);
        refreshInterval = setInterval(fetchApplications, 10000, server?.id);
      }

      return () => {
        clearInterval(refreshInterval);
      };
    }, [isAuthenticated, serverState.currentServer, getAllApplications]),
  );

  useEffect(() => {
    console.log(applications.length);
  }, [applications]);

  const equalsOrInclude = (a: string, b: string): boolean => {
    if (!a || !b) {
      return true;
    }
    a = a.toLocaleLowerCase();
    b = b.toLocaleLowerCase();
    return a.includes(b);
  };

  const filterBySearch = (unfilteredApplications: ApplicationListEntry[], filter: string) => {
    return unfilteredApplications.filter((currentApplication) =>
      [equalsOrInclude(currentApplication.id, filter), equalsOrInclude(currentApplication.name, filter)].reduce(
        (previousValue, currentValue) => previousValue || currentValue,
      ),
    );
  };

  const applicationButtonSheetRef: any = createRef<typeof ApplicationBottomSheet>();

  const openApplicationDetails = (application: ApplicationEntry) => {
    applicationButtonSheetRef.current?.open(application);
  };

  const fetchApplications = (serverId: string) => {
    if (offline) {
      return;
    }

    setLoading(true);
    getAllApplications()
      .then((fetchedApplications) => {
        if (serverState.currentServer?.id !== serverId) {
          setLoading(false);
          return;
        }
        if (isAuthenticated) {
          setApplications(transformExecution(fetchedApplications, false));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        if (isAuthenticated) {
          setApplications([]);
          setLoading(false);
        }
      });
  };

  const transformExecution = (
    source: ApplicationListEntry[] | ApplicationEntry[],
    executing: boolean,
  ): ApplicationListEntry[] => {
    return (
      source
        ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((application: ApplicationEntry | ApplicationListEntry) => ({
          ...application,
          executing: executing,
        })) || []
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
    executeApplication(application.id, {executeDelay: 0})
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

    fetchApplications(serverState.currentServer?.id as any);
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
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 7,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 3,
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
