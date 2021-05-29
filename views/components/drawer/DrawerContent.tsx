import {Animated, Easing, View} from 'react-native';
import {Avatar, Snackbar, Surface, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {ServerContext} from '../../../contexts/ServerContext';

export const DrawerContent = (props: any) => {
  const {serverState} = useContext(ServerContext);
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const rotationAnimation = new Animated.Value(0);
  const [taps, setTaps] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    if (taps < 100) {
      return;
    }
    Animated.sequence(
      Array(taps)
        .fill(0)
        .map((value, index) => {
          return Animated.timing(rotationAnimation, {
            toValue: index % 2 === 0 ? 0 : 360,
            duration: 1000,
            easing: Easing.bounce,
            useNativeDriver: true,
          });
        }),
    ).start(() => {
      setAnimationTriggered(false);
    });
    setAnimationTriggered(true);
  }, [taps, rotationAnimation]);

  return (
    <>
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotationAnimation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
            {perspective: 1000},
          ],
        }}>
        <Surface
          onTouchEnd={() => {
            setTaps((prevState) => prevState + 1);
          }}
          style={{
            margin: 8,
            padding: 8,
            elevation: 15,
            backgroundColor: theme.colors.primary,
            height: 140,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            <Avatar.Icon
              size={50}
              icon="server"
              theme={{colors: {primary: theme.colors.surface}}}
              style={{
                marginEnd: 10,
              }}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 15}}>Connected with:</Text>
              <Text style={{color: 'white', fontSize: 20, flex: 1}}>
                {serverState.currentServer ? serverState.currentServer.name : 'Server'}
              </Text>
            </View>
          </View>
        </Surface>
      </Animated.View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Snackbar visible={animationTriggered} onDismiss={() => {}}>
        Interesting {String.fromCodePoint(129300)}
      </Snackbar>
    </>
  );
};
