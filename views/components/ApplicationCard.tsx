import React, {useContext} from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';
import {FallbackImage} from './FallbackImage';
import {Text, TouchableRipple} from 'react-native-paper';
import {ThemeContext} from '../../contexts/ThemeContext';

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
  return (
    <TouchableRipple
      borderless={true}
      onPress={onPress}
      onLongPress={onLongPress}
      rippleColor={theme.colors.primary}
      style={{
        position: 'relative',
        backgroundColor: theme.colors.surface,
        borderRadius: 10,
        elevation: 5,
        ...((style as any) || {}),
      }}>
      <View>
        <FallbackImage
          url={icon}
          style={{height: 50, width: 50, alignSelf: 'center'}}
        />
        <Text>{name}</Text>
        {loading && (
          <ActivityIndicator
            size={'large'}
            color={'#7e23e8'}
            style={{
              position: 'absolute',
              margin: 'auto',
              height: '50%',
              width: '50%',
              top: 33,
              left: 33,
              right: 33,
              bottom: 33,
            }}
          />
        )}
      </View>
    </TouchableRipple>
  );
};
