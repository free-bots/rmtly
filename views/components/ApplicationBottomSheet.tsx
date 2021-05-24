import React, {Component, useContext} from 'react';
import {View} from 'react-native';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {FallbackImage} from './FallbackImage';
import ActionSheet from 'react-native-actions-sheet';
import Button from './buttons/Button';
import {ThemeContext, ThemeState} from '../../contexts/ThemeContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {Text} from 'react-native-paper';
import {ServerContext} from '../../contexts/ServerContext';
import {Server} from '../../models/persistence/Server';
import {ApplicationContext} from '../../services/ApplicationContext';
import {ExecuteRequest} from '../../models/Request.model';
import {ExecuteResponse} from '../../models/Response.model';

const delays: {label: string; value: number}[] = [0, 3, 5, 10, 30, 60].map((time) => ({
  label: `${time} Sec`,
  value: time * 1000,
}));

export interface ApplicationBottomSheetProps extends ThemeState {
  currentServer: Server | null;
  executeApplication: (applicationId: string, request: ExecuteRequest) => Promise<ExecuteResponse>;
  getIcon: (applicationId: string) => string;
}

export interface ApplicationBottomSheetState {
  application: ApplicationEntry | null;
  executeDelay: number;
}

class ApplicationBottomSheet extends Component<ApplicationBottomSheetProps, ApplicationBottomSheetState> {
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
    this.props
      .executeApplication(application?.id, {
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
                  url={this.props.getIcon(application.id)}
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

const applyContext = (ComponentToWrap: any) => {
  const Wrapped = (props: any) => {
    const {executeApplication, getIcon} = useContext(ApplicationContext);
    const {serverState} = useContext(ServerContext);
    const {dark, light, isLightTheme} = useContext(ThemeContext);
    const {forwardedRef} = props;
    return (
      <ComponentToWrap
        {...props}
        {...{dark, light, isLightTheme, currentServer: serverState.currentServer, executeApplication, getIcon}}
        ref={forwardedRef}
      />
    );
  };

  return React.forwardRef((props, ref) => {
    return <Wrapped {...props} forwardedRef={ref} />;
  });
};

export default applyContext(ApplicationBottomSheet);
