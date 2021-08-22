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
import BookingOptionView from '../BookingOptionView';
import useStores from '../../../hooks/useStores';
import {Text, View} from 'react-native';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import Touchable from '../../../components/Touchable';

type Props = {
  bookingOption: BookingOptionView;
};

export default function BookingOptionItem({bookingOption}: Props) {
  const {bookingStore} = useStores();

  const available = !bookingOption.full;

  const content = (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: available ? colors.transparent : colors.transparent,
      }}>
      <Text
        style={{
          ...palette.textPrimary,
          fontWeight: 'bold',
          color: available ? colors.textPrimary : colors.textDisabled,
        }}>
        {bookingOption.timeSlotTimeString}
      </Text>
      <Text
        style={{
          ...palette.textPrimary,
          color: available ? bookingOption.statusColor : colors.textDisabled,
        }}>
        {bookingOption.statusText}
      </Text>
    </View>
  );

  const clickableContent = (
    <Touchable onPress={() => bookingStore.askToConfirm(bookingOption)}>{content}</Touchable>
  );

  return available ? clickableContent : content;
}
