import React from 'react';
import colors from '../res/colors';
import {TextInput} from 'react-native-paper';
import {TextInput as NativeTextInput} from 'react-native';
import {PaperTextInputPropsWithoutRef} from './utils/PaperPropTypes';

type Props = PaperTextInputPropsWithoutRef;

type State = {
  internalValue: string;
};

export default class ClearableTextInput extends React.Component<Props, State> {
  state: State = {
    internalValue: '',
  };

  /**
   * ClearableTextInput는 외부에 focus 메소드를 제공합니다.
   * 해당 메소드가 작동하기 위해서는 내부의 TextInput으로 focus 이벤트를 전달해야 하기에
   * TextInput 객체의 레퍼런스를 보관합니다.
   */
  private inputRef = React.createRef<NativeTextInput>();

  private valueExists() {
    return this.state.internalValue.length > 0;
  }

  private updateText(text: string) {
    this.setState({
      internalValue: text,
    });
    this.props?.onChangeText?.call(undefined, text);
  }

  render() {
    const clearButton = this.valueExists() ? (
      <TextInput.Icon
        onPress={() => this.updateText('')}
        name={'close'}
        color={colors.textSecondary}
      />
    ) : null;

    return (
      <TextInput
        {...this.props}
        ref={this.inputRef}
        right={clearButton}
        value={this.state.internalValue}
        onChangeText={newText => this.updateText(newText)}
      />
    );
  }

  focus() {
    // focus 이벤트를 전달합니다.
    this.inputRef.current?.focus();
  }
}
