import React, {useContext} from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle, Animated} from 'react-native';
import {FallbackImage} from './FallbackImage';
import {Surface, Text, TouchableRipple} from 'react-native-paper';
import {ThemeContext} from '../../contexts/ThemeContext';
import {ServerContext} from '../../contexts/ServerContext';

export const ApplicationCard = ({
  onPress,
  onLongPress,
  name,
  icon,
  loading,
  style,
}: {
  onPress: () => void;
  onLongPress: () => void;
  name: string;
  icon: string;
  loading: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const maxSize = (style as any)?.height || 50;
  const iconMaxSize = maxSize * 0.5;

  const {serverState} = useContext(ServerContext);
  const token = serverState.currentServer?.authentication.token;

  return (
    <Surface
      style={{
        position: 'relative',
        backgroundColor: theme.colors.surface,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        ...((style as any) || {}),
      }}>
      <TouchableRipple
        borderless={true}
        onPress={onPress}
        onLongPress={onLongPress}
        rippleColor={theme.colors.primary}
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: 10,
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <FallbackImage
            url={icon}
            token={token}
            style={{
              height: iconMaxSize,
              width: iconMaxSize,
              alignSelf: 'center',
            }}
          />
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={{
              maxWidth: maxSize * 0.8,
              textAlign: 'center',
            }}>
            {name}
          </Text>
          {loading && (
            <ActivityIndicator
              size={'large'}
              color={theme.colors.primary}
              style={{
                height: iconMaxSize,
                width: iconMaxSize,
                position: 'absolute',
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      </TouchableRipple>
    </Surface>
  );
};
