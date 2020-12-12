import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

export const BaseScreen = (props: React.ComponentProps<any>) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#7e23e8'} />
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {props.children}
      </SafeAreaView>
    </>
  );
};
