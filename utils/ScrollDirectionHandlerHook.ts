import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useState} from 'react';

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}

export const useScrollDirection = (
  onDirection: (direction: ScrollDirection) => void,
): [(event: NativeSyntheticEvent<NativeScrollEvent>) => void] => {
  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setScrollOffset(currentOffset);
    const direction = currentOffset > scrollOffset ? ScrollDirection.DOWN : ScrollDirection.UP;
    onDirection(direction);
  };

  return [scrollHandler];
};
