import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {ApplicationEntry} from '../../models/ApplicationEntry';
import {FallbackImage} from './FallbackImage';
import ApplicationService from '../../services/Application.service';
import ActionSheet from 'react-native-actions-sheet';

export class ApplicationBottomSheetProps {}

export class ApplicationBottomSheetState {
  constructor(application: ApplicationEntry) {
    this.application = application;
  }
  application: ApplicationEntry | null;
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
    };
  }

  open = (application: ApplicationEntry) => {
    this.setState({application: application});
    this.actionSheetRef.current?.setModalVisible(true);
  };

  close = () => {
    this.actionSheetRef.current?.setModalVisible(false);
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
            </>
          )}
        </View>
      </ActionSheet>
    );
  }
}
