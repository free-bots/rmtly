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
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ApplicationCard} from '../components/ApplicationCard';
import {Actions} from 'react-native-router-flux';
import {Modalize} from 'react-native-modalize';

export class Applications extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      applications: Array(5).fill({
        id: 0,
        name: 'test',
      }),
    };
  }

  componentDidMount() {
    this.closeApplicationModal();
  }

  onPress = (application: any) => () => {
    console.log('press');
    console.log(application);
  };

  onLongPress = (application: any) => () => {
    console.log('long press');
    console.log(application);
    this.openApplicationModal();
  };

  private modalizeRef = React.createRef<Modalize>();

  openApplicationModal = () => {
    this.modalizeRef.current?.open();
  };

  closeApplicationModal = () => {
    this.modalizeRef.current?.close();
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
        <SafeAreaView>
          <View style={styles.body}>
            <FlatList
              data={this.state.applications}
              renderItem={(renderInfo) => (
                <TouchableWithoutFeedback
                  onPress={this.onPress(renderInfo.item)}
                  onLongPress={this.onLongPress(renderInfo.item)}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ApplicationCard application={renderInfo.item} />
                  </View>
                </TouchableWithoutFeedback>
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
            {!this.state.open && (
              <>
                <TextInput style={styles.search} />
                <Button
                  title={'to connection'}
                  onPress={() => {
                    Actions.connection();
                  }}
                />
              </>
            )}
            <Modalize
              onOpen={() => {
                this.setState({
                  open: true,
                });
              }}
              onClose={() => {
                this.setState({open: false});
              }}
              ref={this.modalizeRef}
              adjustToContentHeight={true}
              panGestureComponentEnabled={true}>
              {this.state.applications.map((application: any) => (
                <Text>{application.name}</Text>
              ))}
            </Modalize>
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
    backgroundColor: '#d4d4d4',
    borderColor: '#bfbfbf',
    elevation: 10,
    borderWidth: 3,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
  },
});
