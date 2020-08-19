import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

// todo settings page for the connection to the server

export class Connection extends Component<any, any> {
  render() {
    return (
      <View style={style.body}>
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
    );
  }
}

const style = StyleSheet.create({
  body: {
    height: '100%',
  },
});
