import {TextInput as PaperTextInput, withTheme} from 'react-native-paper';
import React from 'react';

const TextInput = (props: any) => {
  return <PaperTextInput style={{margin: 5}} {...props} />;
};

export default withTheme(TextInput);
