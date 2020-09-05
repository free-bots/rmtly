// todo display a singe application

import React from 'react';
import {
  Image,
  PixelRatio,
  ProgressBarAndroid,
  StyleSheet,
  View,
} from 'react-native';

export const ApplicationCard = ({loading, icon}: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        elevation: 10,
      }}>
      <View style={styles.card}>
        <View>
          <Image
            source={icon}
            style={styles.image}
            resizeMode={'cover'}
            width={5}
            height={5}
          />
          {loading && <ProgressBarAndroid />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: PixelRatio.getPixelSizeForLayoutSize(50),
    width: PixelRatio.getPixelSizeForLayoutSize(50),
    backgroundColor: '#9857fd',
    borderColor: '#7438d4',
    borderWidth: 5,
    borderRadius: PixelRatio.getPixelSizeForLayoutSize(10),
    margin: 5,
  },
  image: {
    height: 100,
    width: 100,
  },
});
