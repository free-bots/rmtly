// todo list all the applications here

import React, {Component} from 'react';
import {
  FlatList,
  PixelRatio,
  RefreshControl,
  StyleSheet,
  TextInput,
} from 'react-native';
import {ApplicationCard} from '../components/ApplicationCard';

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
        <TextInput style={style.search} />
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
      </>
    );
  }
}

const style = StyleSheet.create({
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
