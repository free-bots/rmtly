import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ApplicationService from '../../../services/Application.service';
import {
  SortedApplicationResponse,
  SortedValue,
  SortKey,
} from '../../../models/Response.model';

export const Categories = ({navigation}: any) => {
  const [sortedApplications, setSortedApplications] = useState<
    SortedApplicationResponse
  >();

  const fetchApplicationsSortedByCategory = () => {
    ApplicationService.sortApplicationBy(SortKey.CATEGORY)
      .then((fetchedApplications) => {
        setSortedApplications(fetchedApplications);
      })
      .catch((error) => console.error(error));
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

  useEffect(() => {
    fetchApplicationsSortedByCategory();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View>
          <FlatList
            data={sortedApplications?.values}
            renderItem={(info: ListRenderItemInfo<SortedValue>) => (
              <View>
                <Button
                  title={info.item.sortedValue}
                  onPress={() => {
                    navigateToCategory(info.item);
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
