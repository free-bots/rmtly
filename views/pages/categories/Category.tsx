import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {ApplicationList} from '../../components/ApplicationList';
import {ApplicationEntry} from '../../../models/ApplicationEntry';

export const Category = ({
  route,
}: {
  route: {params: {category: string; applications: ApplicationEntry[]}};
}) => {
  // todo show all apps of a category
  const {category, applications} = route.params;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <ApplicationList onDetails={(application) => {}} />
      </SafeAreaView>
    </>
  );
};
