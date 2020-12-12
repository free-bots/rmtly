import {FlatList, ListRenderItemInfo, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ApplicationService from '../../../services/Application.service';
import {
  SortedApplicationResponse,
  SortedValue,
  SortKey,
} from '../../../models/Response.model';
import {List} from 'react-native-paper';
import {BaseScreen} from '../base/BaseScreen';
import {ThemeContext} from '../../../contexts/ThemeContext';

export const Categories = ({navigation}: any) => {
  const [sortedApplications, setSortedApplications] = useState<
    SortedApplicationResponse
  >();

  const [loading, setLoading] = useState(false);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

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
      <BaseScreen>
        <View>
          <FlatList
            refreshing={loading}
            onRefresh={() => {
              onRefresh();
            }}
            data={sortedApplications?.values}
            renderItem={(info: ListRenderItemInfo<SortedValue>) => (
              <View>
                <List.Item
                  title={info.item.sortedValue}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="file-tree-outline"
                      style={{
                        borderRadius: 100,
                        backgroundColor: theme.colors.primary,
                      }}
                    />
                  )}
                  onPress={() => {
                    navigateToCategory(info.item);
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => item.sortedValue || String(index)}
          />
        </View>
      </BaseScreen>
    </>
  );
};
