/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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
import colors from '../../res/colors';
import palette from '../../res/palette';
import BackIcon from '../BackIcon';
import {Platform} from 'react-native';
import {TransitionPresets} from '@react-navigation/stack';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

const commonStackHeaderOptions: StackHeaderOptions = {
  headerBackTitleVisible: false,
  headerTitleStyle: palette.boldText,
  headerTintColor: colors.textPrimary,
  headerLeftContainerStyle: {
    left: Platform.OS === 'ios' ? 12 : 0,
  },
  headerBackImage: () => <BackIcon />,
  ...TransitionPresets.SlideFromRightIOS,
};

const commonModalHeaderOptions: StackHeaderOptions = {
  headerBackTitleVisible: false,
  headerTitleStyle: palette.boldText,
  headerTintColor: colors.textPrimary,
  headerLeftContainerStyle: {
    left: Platform.OS === 'ios' ? 12 : 0,
  },
  headerBackImage: () => <BackIcon />,
};

export default {
  commonStackHeaderOptions,
  commonModalHeaderOptions,
};
