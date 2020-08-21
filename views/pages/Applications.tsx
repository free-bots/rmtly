// todo list all the applications here

import React, {Component} from 'react';
import {
  Button,
  FlatList,
  PixelRatio,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  ToolbarAndroid,
  View,
} from 'react-native';
import {ApplicationCard} from '../components/ApplicationCard';
import {Actions} from 'react-native-router-flux';

export class Applications extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      applications: Array(5).fill(''),
    };
  }

  onPress = () => (application: any) => {
    console.log('press');
    console.log(application);
  };

  onLongPress = (application: any) => {
    console.log('long press');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
        <SafeAreaView>
          <View style={styles.body}>
            <TextInput style={styles.search} />
            <FlatList
              data={this.state.applications}
              renderItem={(item) => (
                <ApplicationCard
                  application={item}
                  onPress={this.onPress}
                  onLongPress={this.onLongPress}
                />
              )}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item, index) => String(index)}
              automaticallyAdjustContentInsets={false}
              contentInset={{
                bottom: PixelRatio.getPixelSizeForLayoutSize(5),
                top: PixelRatio.getPixelSizeForLayoutSize(5),
                left: PixelRatio.getPixelSizeForLayoutSize(5),
                right: PixelRatio.getPixelSizeForLayoutSize(5),
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loading}
                  onRefresh={() => {
                    this.setState({
                      loading: true,
                    });
                    setTimeout(() => {
                      this.setState({
                        loading: false,
                      });
                    }, 5000);
                  }}
                />
              }
            />
            <Button
              title={'to connection'}
              onPress={() => {
                Actions.connection();
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#7e23e8',
    height: '100%',
  },
  search: {
    margin: PixelRatio.getPixelSizeForLayoutSize(1),
    paddingLeft: PixelRatio.getPixelSizeForLayoutSize(5),
    paddingRight: PixelRatio.getPixelSizeForLayoutSize(5),
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(2),
    paddingBottom: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#686868',
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
  },
});
