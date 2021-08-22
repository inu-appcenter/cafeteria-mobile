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
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import Touchable from '../../../components/Touchable';
import {Text, View, StyleSheet} from 'react-native';
import BookingOptionView from '../BookingOptionView';

type Props = {
  bookingOption: BookingOptionView;
};

export default function BookingOptionItem({bookingOption}: Props) {
  const {bookingStore} = useStores();

  const available = !bookingOption.full;

  const containerBackgroundColor = available ? colors.transparent : colors.transparent;
  const highlightedTextColor = available ? colors.textPrimary : colors.textDisabled;
  const statusTextColor = available ? bookingOption.statusColor : colors.textDisabled;

  const content = (
    <View style={{...styles.container, backgroundColor: containerBackgroundColor}}>
      <Text style={{...styles.highlightedText, color: highlightedTextColor}}>
        {bookingOption.timeSlotTimeString}
      </Text>
      <Text style={{...palette.textPrimary, color: statusTextColor}}>{bookingOption.statusText}</Text>
    </View>
  );

  const clickableContent = (
    <Touchable onPress={() => bookingStore.askToConfirm(bookingOption)}>{content}</Touchable>
  );

  return available ? clickableContent : content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  highlightedText: {
    ...palette.textPrimary,
    fontWeight: 'bold',
  },
});
