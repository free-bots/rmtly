import React, {Component, ReactElement} from 'react';
import {Dialog as _Dialog, Portal} from 'react-native-paper';
import Button from '../buttons/Button';

export interface DialogProps {
  title: string;
  content: ReactElement;
  actions: DialogActionProps[];
}

export interface DialogState {
  visible: boolean;
}

export class Dialog extends Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  public showDialog = () => this.setState({visible: true});

  public hideDialog = () => this.setState({visible: false});

  public render() {
    return (
      <>
        <Portal>
          <_Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <_Dialog.Title>{this.props.title}</_Dialog.Title>
            <_Dialog.Content>{this.props.content}</_Dialog.Content>
            <_Dialog.Actions>
              {this.props.actions.map((action, index) => (
                <DialogAction
                  key={index}
                  title={action.title}
                  onPress={() => {
                    this.hideDialog();
                    action.onPress();
                  }}
                />
              ))}
            </_Dialog.Actions>
          </_Dialog>
        </Portal>
      </>
    );
  }
}

export interface DialogActionProps {
  title: string;
  onPress: (() => void) | (() => Promise<void>);
}

export const DialogAction = (props: DialogActionProps) => {
  return (
    <Button
      onPress={() => {
        props.onPress();
      }}>
      {props.title}
    </Button>
  );
};
