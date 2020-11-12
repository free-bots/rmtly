import React, {Component} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {ApplicationList} from '../components/ApplicationList';
import {ApplicationEntry} from '../../models/ApplicationEntry';

export default class Home extends Component<any, any> {
  actionSheetRef: any = React.createRef<ActionSheet>();

  componentDidMount() {}

  openApplicationDetails = (application: ApplicationEntry) => {
    this.actionSheetRef.current?.setModalVisible();
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
        <SafeAreaView>
          {/*<View*/}
          {/*  style={{*/}
          {/*    position: 'absolute',*/}
          {/*    height: '33%',*/}
          {/*    top: 0,*/}
          {/*    left: 0,*/}
          {/*    right: 0,*/}
          {/*    backgroundColor: '#7e23e8',*/}
          {/*    borderBottomLeftRadius: 30,*/}
          {/*    borderBottomRightRadius: 30,*/}

          {/*    shadowColor: '#000',*/}
          {/*    shadowOffset: {*/}
          {/*      width: 0,*/}
          {/*      height: 8,*/}
          {/*    },*/}
          {/*    shadowOpacity: 0.46,*/}
          {/*    shadowRadius: 11.14,*/}

          {/*    elevation: 17,*/}
          {/*  }}*/}
          {/*/>*/}
          <View
            style={{
              elevation: 18,
            }}>
            {/*<View*/}
            {/*  style={{*/}
            {/*    height: '20%',*/}
            {/*    padding: 10,*/}
            {/*  }}>*/}
            {/*  <View>*/}
            {/*    <Text>*/}
            {/*      Number of Applications: 10 | All / 10 Selected Categories*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*  <View*/}
            {/*    style={{*/}
            {/*      height: '100%',*/}
            {/*    }}>*/}
            {/*    <CategoryList />*/}
            {/*  </View>*/}
            {/*</View>*/}
            <View
              style={
                {
                  // marginTop: '5%',
                  // height: '77.72%',
                }
              }>
              <ApplicationList
                onDetails={(application: ApplicationEntry) => {
                  this.openApplicationDetails(application);
                }}
              />
            </View>
          </View>
          <ActionSheet
            ref={this.actionSheetRef}
            gestureEnabled={true}
            initialOffsetFromBottom={500}>
            <View
              style={{
                height: 500,
              }}>
              <Text>hi</Text>
            </View>
          </ActionSheet>
        </SafeAreaView>
      </>
    );
  }
}
