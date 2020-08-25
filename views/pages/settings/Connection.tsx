import React, {Component} from 'react';
import {
  AsyncStorage,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// todo settings page for the connection to the server

export class Connection extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: '',
      token: '',
    };
  }

  async componentWillMount() {
    const url = await AsyncStorage.getItem('URL');
    const token = await AsyncStorage.getItem('TOKEN');
    this.setState({
      url,
      token,
    });
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
        <SafeAreaView>
          <View style={styles.body}>
            <Text>Address</Text>
            <TextInput />
            <Button
              title={'Scan QR'}
              onPress={() => {
                console.log('todo open qr scanner');
              }}
            />
            <Button
              title={'Test connection'}
              onPress={() => {
                console.log('todo test connection');
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
});
