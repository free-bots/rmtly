import React, {createRef, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {
  ApplicationList,
  ApplicationListEntry,
} from '../components/ApplicationList';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {ApplicationBottomSheet} from '../components/ApplicationBottomSheet';
import ApplicationService from '../../services/Application.service';

export const Applications = ({route}: any) => {
  const category = route.params?.category as {
    title: string;
    applications: ApplicationEntry[];
  };
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<ApplicationListEntry[]>([]);

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
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View
          style={{
            elevation: 18,
          }}>
          <View>
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
              applications={applications}
            />
          </View>
        </View>
        <ApplicationBottomSheet ref={applicationButtonSheetRef} />
      </SafeAreaView>
    </>
  );
};
