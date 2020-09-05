// todo list all the applications here

// todo fetch with hook
// new bottom sheet ? https://github.com/NYSamnang/react-native-raw-bottom-sheet
// qr scanner
// async storage save token / server / port ...
// https://github.com/moaazsidat/react-native-qrcode-scanner

import React, {Component} from 'react';
import {
  Alert,
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
import {IconResponse} from '../../models/Response';
import {ApplicationEntry} from '../../models/ApplicationEntry';

export class Applications extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      applications: Array(5).fill({
        id: 0,
        name: '',
      }),
    };
  }

  componentDidMount() {
    this.closeApplicationModal();
    // this.fetchApplications();
  }

  fetchApplications() {
    const headers = new Headers();
    headers.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJZCI6IklEIiwiZXhwIjoxNjA1NjI3NjE1fQ.du8tOqJ_r6Ra44Z5s1FZudIMR86owW83RY-hPDpkwXZTRKbFwZO9jcPQTFPb7KYkFJAPv2v9JAk1EnWWCwz2_A',
    );
    fetch('http://10.0.2.2:3000/applications?icon=true', {
      headers: headers,
    })
      .then((response) => response.json())
      .then(
        (json: ApplicationEntry[]) => {
          this.setState({
            applications: json,
          });

          // todo merge in server the images -> appication.icon -> application.iconBase64

          // json.map(async (application) => {
          //   const icon = await this.fetchIcon(application.id).then(
          //     (response) => response.iconBase64,
          //   );
          //   application.icon = icon;
          //   return application;
          // });
        },

        // const applications = (json as ApplicationEntry[]).map((application) => {
        //   return this.fetchIcon(application.id)
        //     .then((icon) => {
        //       application.icon = icon?.iconBase64;
        //       return application;
        //     })
        //     .catch((error) => {
        //       console.error(error);
        //       return application;
        //     });
        // });
        // Promise.all(applications)
        //   .then((applicationsEntries) => {
        //     this.setState({
        //       applications: applicationsEntries,
        //     });
        //   })
        //   .catch((error) => console.error(error));
      )
      .catch((error) => {
        console.error(error);
        Alert.alert('fetching applications failed');
      });
  }

  fetchIcon(applicationId: string): Promise<IconResponse> {
    const headers = new Headers();
    headers.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJEZXZpY2VJZCI6IklEIiwiZXhwIjoxNjA1NjI3NjE1fQ.du8tOqJ_r6Ra44Z5s1FZudIMR86owW83RY-hPDpkwXZTRKbFwZO9jcPQTFPb7KYkFJAPv2v9JAk1EnWWCwz2_A',
    );
    return fetch(`http://10.0.2.2:3000/applications/${applicationId}/icon`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => json as IconResponse)
      .catch((error) => console.error(error)) as Promise<IconResponse>;
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

  onRefresh = () => {
    this.setState({
      loading: true,
    });
    // todo fetch again
    // todo set loading false
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 5000);
  };

  render() {
    const {loading, applications} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
        <SafeAreaView>
          <View style={styles.body}>
            <FlatList
              data={applications}
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
                    <ApplicationCard
                      application={renderInfo.item}
                      icon={require('../../icon.png')}
                    />
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
                  refreshing={loading}
                  onRefresh={this.onRefresh}
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
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#d4d4d4',
    borderColor: '#bfbfbf',
    elevation: 10,
    borderWidth: 3,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
  },
});
