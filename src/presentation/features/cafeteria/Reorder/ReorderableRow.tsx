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

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import CafeteriaView from '../CafeteriaView';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default function ReorderableRow({
  item,
  drag,
  isActive,
}: RenderItemParams<CafeteriaView>) {
  const computedStyles = StyleSheet.create({
    rowContainer: {
      backgroundColor: isActive ? colors.rippleColorLight : 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
  });

  return (
    <TouchableWithoutFeedback onLongPress={drag} delayLongPress={50}>
      <View style={computedStyles.rowContainer}>
        <Text style={[palette.textPrimary, palette.boldText]}>
          {item.displayName}
        </Text>
        <Icon name="menu" size={24} color={colors.textSecondary} />
      </View>
    </TouchableWithoutFeedback>
  );
}
