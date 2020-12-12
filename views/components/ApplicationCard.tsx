import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {FallbackImage} from './FallbackImage';
import {TouchableRipple} from 'react-native-paper';

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
  return (
    // <Card>
    //   {/*<Card.Title title={name}/>*/}
    //   {/*<Card.Content>*/}
    //   {/*  <Title>Card title</Title>*/}
    //   {/*  <Paragraph>Card content</Paragraph>*/}
    //   {/*</Card.Content>*/}
    //   <Card.Cover source={{ uri: icon }} />
    // </Card>
    <TouchableRipple
      borderless={true}
      onPress={onPress}
      onLongPress={onLongPress}
      rippleColor={'black'}
      style={{
        position: 'relative',
        backgroundColor: '#fff',
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
