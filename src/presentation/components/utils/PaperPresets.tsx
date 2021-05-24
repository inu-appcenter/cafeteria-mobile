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

import colors from '../../res/colors';
import {Button} from 'react-native-paper';
import {PaperTextInputPropsWithoutRef} from './PaperPropTypes';

const commonTextInput: PaperTextInputPropsWithoutRef = {
  mode: 'outlined',
  theme: {
    colors: {
      primary: colors.mainTint,
      placeholder: colors.textSecondary,
    },
  },
  selectionColor: colors.mainTint,
};

const idTextInput: PaperTextInputPropsWithoutRef = {
  ...commonTextInput,
  returnKeyType: 'next',
  keyboardType: 'number-pad',
};

const passwordTextInput: PaperTextInputPropsWithoutRef = {
  ...commonTextInput,
  returnKeyType: 'go',
  secureTextEntry: true,
  clearTextOnFocus: true,
  enablesReturnKeyAutomatically: true,
};

const wideButton: typeof Button.defaultProps = {
  contentStyle: {
    padding: 6,
  },
  mode: 'contained',
};

const wideThemedButton: typeof Button.defaultProps = {
  contentStyle: {
    padding: 6,
  },
  labelStyle: {color: 'white', fontSize: 16},
  color: colors.mainTint,
  mode: 'contained',
};

const grayBorderedButton: typeof Button.defaultProps = {
  labelStyle: {color: colors.textSecondary, fontSize: 12},
  color: 'gray',
  mode: 'outlined',
};

export default {
  commonTextInput,
  idTextInput,
  passwordTextInput,
  wideButton,
  wideThemedButton,
  grayBorderedButton,
};
