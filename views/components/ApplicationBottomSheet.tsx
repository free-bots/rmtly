import React, {Component, useContext} from 'react';
import {View} from 'react-native';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {FallbackImage} from './FallbackImage';
import ApplicationService from '../../services/Application.service';
import ActionSheet from 'react-native-actions-sheet';
import Button from './buttons/Button';
import {ThemeContext, ThemeState} from '../../contexts/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';

const delays: {label: string; value: number}[] = [0, 3, 5, 10, 30, 60].map(
  (time) => ({
    label: `${time} Sec`,
    value: time,
  }),
);

export interface ApplicationBottomSheetProps extends ThemeState {}

export interface ApplicationBottomSheetState {
  application: ApplicationEntry | null;
  executeDelay: number;
}

class ApplicationBottomSheet extends Component<
  ApplicationBottomSheetProps,
  ApplicationBottomSheetState
> {
  actionSheetRef: any = React.createRef<ActionSheet>();

  constructor(props: ApplicationBottomSheetProps) {
    super(props);
    this.state = {
      application: null,
      executeDelay: 0,
    };
  }

  open = (application: ApplicationEntry) => {
    this.setState({application: application});
    this.actionSheetRef.current?.setModalVisible(true);
  };

  close = () => {
    this.actionSheetRef.current?.setModalVisible(false);
  };

  execute = () => {
    const {application} = this.state;
    const {executeDelay} = this.state;
    if (!application) {
      return;
    }
    ApplicationService.executeApplication(application?.id, {
      executeDelay: executeDelay,
    })
      .then(() => {})
      .catch((error) => console.error(error));
  };

  render() {
    const theme = this.props.isLightTheme ? this.props.light : this.props.dark;
    const {application} = this.state;
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
          {application && (
            <>
              <View>
                <FallbackImage
                  url={ApplicationService.getIcon(application.id)}
                  style={{height: 100, width: 100, alignSelf: 'center'}}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                  }}>
                  {application.name}
                </Text>
              </View>
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
                onChangeItem={(item) =>
                  this.setState({executeDelay: Number(item.value)})
                }
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

const applyTheme = (ComponentToWrap: any) => {
  const Wrapped = (props: any) => {
    const {dark, light, isLightTheme} = useContext(ThemeContext);
    const {forwardedRef} = props;
    return (
      <ComponentToWrap
        {...props}
        {...{dark, light, isLightTheme}}
        ref={forwardedRef}
      />
    );
  };

  return React.forwardRef((props, ref) => {
    return <Wrapped {...props} forwardedRef={ref} />;
  });
};

export default applyTheme(ApplicationBottomSheet);
