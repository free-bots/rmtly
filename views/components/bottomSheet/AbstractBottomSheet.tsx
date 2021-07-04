import React, {Component} from 'react';
import {View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Button from './../buttons/Button';
import {ThemeState} from '../../../contexts/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';

const delays: {label: string; value: number}[] = [0, 3, 5, 10, 30, 60].map((time) => ({
  label: `${time} Sec`,
  value: time * 1000,
}));

export interface AbstractBottomSheetProps extends ThemeState {
  header: (props: any, state: AbstractBottomSheetState) => React.ReactNode | undefined;
  data: any | undefined;
  onExecute: (props: AbstractBottomSheetProps, state: AbstractBottomSheetState) => Promise<void>;
}

export interface AbstractBottomSheetState {
  openData: any;
  executeDelay: number;
  loading: boolean;
}

export class AbstractBottomSheet extends Component<AbstractBottomSheetProps, AbstractBottomSheetState> {
  actionSheetRef: any = React.createRef<ActionSheet>();

  constructor(props: AbstractBottomSheetProps) {
    super(props);
    this.state = {
      openData: null,
      executeDelay: 0,
      loading: false,
    };
  }

  open = (openData: any) => {
    this.setState({openData: openData});
    this.actionSheetRef.current?.setModalVisible(true);
  };

  close = () => {
    this.actionSheetRef.current?.setModalVisible(false);
  };

  execute = () => {
    this.setState({loading: true});
    this.props
      ?.onExecute(this.props, this.state)
      .then(() => {
        this.setState({loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
        console.error(error);
      });
  };

  render() {
    const theme = this.props.isLightTheme ? this.props.light : this.props.dark;
    return (
      <ActionSheet
        indicatorColor={theme.colors.primary}
        bounceOnOpen={false}
        containerStyle={{
          backgroundColor: theme.colors.background,
        }}
        ref={this.actionSheetRef}
        gestureEnabled={true}
        onClose={() => {}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 350,
          }}>
          {this.state.openData && (
            <>
              <View>{this.props?.header(this.props, this.state)}</View>
              <DropDownPicker
                arrowColor={theme.colors.primary}
                showArrow={true}
                dropDownMaxHeight={100}
                items={delays}
                autoScrollToDefaultValue={true}
                defaultValue={this.state.executeDelay}
                style={{
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.background,
                }}
                dropDownStyle={{
                  borderTopLeftRadius: theme.roundness,
                  borderTopRightRadius: theme.roundness,
                  borderBottomLeftRadius: theme.roundness,
                  borderBottomRightRadius: theme.roundness,
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.primary,
                }}
                containerStyle={{height: 50, margin: 5}}
                itemStyle={{
                  backgroundColor: theme.colors.background,
                  justifyContent: 'flex-start',
                }}
                labelStyle={{
                  color: theme.colors.primary,
                }}
                selectedLabelStyle={{
                  color: theme.colors.primary,
                }}
                onChangeItem={(item) => {
                  console.log(item);
                  this.setState({executeDelay: Number(item.value)});
                }}
              />
              <Button
                onPress={() => {
                  this.execute();
                }}>
                Run
              </Button>
            </>
          )}
        </View>
      </ActionSheet>
    );
  }
}
