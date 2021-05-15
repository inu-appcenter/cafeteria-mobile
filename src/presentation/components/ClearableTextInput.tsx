import {View} from 'react-native';
import colors from '../res/colors';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';

export default function ClearableTextInput(
  props: typeof TextInput.defaultProps,
) {
  const [internalValue, setInternalValue] = useState('');

  const updateText = (text: string) => {
    setInternalValue(text);
    props?.onChangeText?.call(undefined, text);
  };

  const valueExists = () => {
    return internalValue.length > 0;
  };

  const clearButton = valueExists() ? (
    <TextInput.Icon
      onPress={() => updateText('')}
      name={'close'}
      color={colors.textSecondary}
    />
  ) : (
    <View />
  );

  return (
    <TextInput
      {...props}
      right={clearButton}
      value={internalValue}
      onChangeText={newText => updateText(newText)}
    />
  );
}
