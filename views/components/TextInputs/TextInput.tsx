import {TextInput as PaperTextInput, withTheme} from 'react-native-paper';
import React from 'react';

const TextInput = (props: any) => {
  return <PaperTextInput {...props} />;
};

export default withTheme(TextInput);
