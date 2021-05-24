/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
