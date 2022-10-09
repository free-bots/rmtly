import React, {Component, ReactElement} from 'react';
import {Dialog as _Dialog, Portal} from 'react-native-paper';
import Button from '../buttons/Button';

export interface DialogProps {
  title: string | ((data?: any) => string);
  content: ReactElement | ((data?: any) => ReactElement);
  actions: DialogActionProps[];
}

export interface DialogState {
  visible: boolean;
  data?: any;
}

export class Dialog extends Component<DialogProps, DialogState> {
  constructor(props: DialogProps) {
    super(props);
    this.state = {
      visible: false,
      data: null,
    };
  }

  public isVisible = () => this.state.visible;

  public showDialog = (data: any) => this.setState({visible: true, data});

  public hideDialog = () => this.setState({visible: false});

  public render() {
    return (
      <>
        <Portal>
          <_Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <_Dialog.Title>
              {typeof this.props.title === 'function' ? this.props.title(this.state.data) : this.props.title}
            </_Dialog.Title>
            <_Dialog.Content>
              {typeof this.props.content === 'function' ? this.props.content(this.state.data) : this.props.content}
            </_Dialog.Content>
            <_Dialog.Actions>
              {this.props.actions.map((action, index) => (
                <DialogAction
                  key={index}
                  title={action.title}
                  onPress={() => {
                    this.hideDialog();
                    action.onPress(this.state.data);
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
  onPress: ((data?: any) => void) | ((data?: any) => Promise<void>);
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
