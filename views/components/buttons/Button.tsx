import React from 'react';
import {Button as PaperButton, withTheme} from 'react-native-paper';

const Button = (props: any) => {
  return <PaperButton mode={'outlined'} style={{margin: 5}} {...props} />;
};

export default withTheme(Button);
