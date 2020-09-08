import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {ApplicationCard} from './ApplicationCard';

export class Application {
  constructor(id: string, name: string, icon: string, categories: string[]) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.categories = categories;
  }

  id: string;
  name: string;
  icon: string;
  categories: string[];
}

// todo if no entries -> reload button
// todo get applications from context and hook
export const ApplicationList = ({
  applications,
  onDetails,
}: {
  applications: Application[];
  onDetails: (application: Application) => void;
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const isListEmpty = applications?.length < 0;

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onPress = () => {
    console.log('application list press');
    // todo run application
  };

  const onLongPress = (application: Application) => {
    console.log('application list long press');
    onDetails(application);
  };

  const numColumns = 3;

  return (
    <>
      {isListEmpty && <Text>No Applications reload?</Text>}
      {!isListEmpty && (
        <FlatList
          refreshing={refreshing}
          horizontal={false}
          numColumns={numColumns}
          onRefresh={onRefresh}
          data={applications}
          renderItem={(itemInfo: ListRenderItemInfo<Application>) => (
            <Pressable
              onPress={onPress}
              onLongPress={() => {
                onLongPress(itemInfo.item);
              }}
              style={{
                flex: 1 / numColumns,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <ApplicationCard name={itemInfo.item.name} icon={''} />
            </Pressable>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      )}
    </>
  );
};
