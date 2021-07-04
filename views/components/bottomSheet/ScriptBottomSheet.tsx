import React, {Ref, useContext} from 'react';
import {AbstractBottomSheet, AbstractBottomSheetProps, AbstractBottomSheetState} from './AbstractBottomSheet';
import {ThemeContext} from '../../../contexts/ThemeContext';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';

export interface ScriptBottomSheetProps {
  data: any | undefined;
  onExecute: (props: AbstractBottomSheetProps, state: AbstractBottomSheetState) => Promise<void>;
}

export const ScriptBottomSheet = React.forwardRef((props: ScriptBottomSheetProps, ref: Ref<AbstractBottomSheet>) => {
  const {dark, light, isLightTheme} = useContext(ThemeContext);
  return (
    <AbstractBottomSheet
      ref={ref}
      dark={dark}
      light={light}
      isLightTheme={isLightTheme}
      {...props}
      header={(abstractProps, abstractState) => (
        <>
          <Image source={require('../../../assets/code.png')} style={{height: 100, width: 100, alignSelf: 'center'}} />
          <Text
            style={{
              alignSelf: 'center',
            }}>
            {abstractState.openData?.script?.name}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
            }}>
            {abstractState.openData?.script?.description}
          </Text>
        </>
      )}
    />
  );
});
