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
import {ViewProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = ViewProps & {
  reversed?: boolean;
};

export default function VerticalShadow({style, reversed}: Props) {
  const colors = reversed
    ? ['#00000000', '#0000000D']
    : ['#0000000D', '#00000000'];

  return (
    <LinearGradient
      style={[{height: 4, width: '100%'}, style]}
      colors={colors}
    />
  );
}
