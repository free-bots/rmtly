import React from 'react';
import {Button as PaperButton, withTheme} from 'react-native-paper';

const Button = (props: any) => {
  return <PaperButton mode={'outlined'} {...props} />;
};

export default withTheme(Button);
