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
import palette from '../res/palette';
import Toast, {BaseToast} from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ToastPlaceHolder() {
  const {top} = useSafeAreaInsets();

  const defaultToastConfig = {
    contentContainerStyle: {paddingHorizontal: 15},
    text1Style: palette.textSubPrimary,
    text1NumberOfLines: 1,
    text2Style: palette.textSecondary,
    text2NumberOfLines: 1,
    onTrailingIconPress: Toast.hide,
  };

  const toastConfig = {
    info: ({...rest}) => (
      <BaseToast
        {...rest}
        {...defaultToastConfig}
        style={{borderLeftColor: colors.mainTint}}
      />
    ),
    success: ({...rest}) => (
      <BaseToast
        {...rest}
        {...defaultToastConfig}
        style={{borderLeftColor: colors.green}}
      />
    ),
    error: ({...rest}) => (
      <BaseToast
        {...rest}
        {...defaultToastConfig}
        style={{borderLeftColor: colors.red}}
      />
    ),
  };

  return (
    <Toast
      config={toastConfig}
      topOffset={top}
      ref={ref => Toast.setRef(ref)}
    />
  );
}
