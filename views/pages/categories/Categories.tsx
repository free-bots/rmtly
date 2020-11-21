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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplicationsSortedByCategory();

    const interval = setInterval(() => {
      fetchApplicationsSortedByCategory();
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onRefresh = () => {
    fetchApplicationsSortedByCategory();
  };

  const fetchApplicationsSortedByCategory = () => {
    setLoading(true);
    ApplicationService.sortApplicationBy(SortKey.CATEGORY)
      .then((fetchedApplications) => {
        fetchedApplications.values.sort((a, b) =>
          a.sortedValue.localeCompare(b.sortedValue),
        );
        setLoading(false);
        setSortedApplications(fetchedApplications);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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

  useEffect(() => {
    fetchApplicationsSortedByCategory();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView>
        <View>
          <FlatList
            refreshing={loading}
            onRefresh={() => {
              onRefresh();
            }}
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
            keyExtractor={(item, index) => item.sortedValue || String(index)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
