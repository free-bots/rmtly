import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {FallbackImage} from './FallbackImage';
import ApplicationService from '../../services/Application.service';
import ActionSheet from 'react-native-actions-sheet';
import {Picker} from '@react-native-picker/picker';
import {ItemValue} from '@react-native-picker/picker/typings/Picker';
import Button from './buttons/Button';

const delays: {display: string; value: number}[] = [
  {
    display: '0 Sec',
    value: 0,
  },
  {
    display: '3 Sec',
    value: 3000,
  },
  {
    display: '5 Sec',
    value: 5000,
  },
  {
    display: '10 Sec',
    value: 10000,
  },
  {
    display: '30 Sec',
    value: 30000,
  },
];

export class ApplicationBottomSheetProps {}

export class ApplicationBottomSheetState {
  constructor(application: ApplicationEntry | null, executeDelay: number) {
    this.application = application;
    this.executeDelay = executeDelay;
  }

  application: ApplicationEntry | null;
  executeDelay: number;
}

export class ApplicationBottomSheet extends Component<
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
    const {application} = this.state;
    return (
      <ActionSheet
        ref={this.actionSheetRef}
        gestureEnabled={true}
        initialOffsetFromBottom={500}>
        <View
          style={{
            height: 500,
          }}>
          {application && (
            <>
              <FallbackImage
                url={ApplicationService.getIcon(application.id)}
                style={{height: 100, width: 100, alignSelf: 'center'}}
              />
              <Text>{application.name}</Text>
              <Picker
                mode={'dropdown'}
                selectedValue={this.state.executeDelay}
                style={{height: 50}}
                onValueChange={(itemValue: ItemValue) =>
                  this.setState({executeDelay: Number(itemValue)})
                }>
                {delays.map((delay, index) => (
                  <Picker.Item
                    label={delay.display}
                    value={delay.value}
                    key={index}
                  />
                ))}
              </Picker>
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
