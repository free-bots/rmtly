import React, {useContext} from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';
import {FallbackImage} from './FallbackImage';
import {Text, TouchableRipple} from 'react-native-paper';
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
    <TouchableRipple
      borderless={true}
      onPress={onPress}
      onLongPress={onLongPress}
      rippleColor={theme.colors.primary}
      style={{
        position: 'relative',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.roundness,
        elevation: 1,
        ...((style as any) || {}),
      }}>
      <View>
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
  );
};
