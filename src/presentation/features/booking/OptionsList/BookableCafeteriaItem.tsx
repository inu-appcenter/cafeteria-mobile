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
import {Button} from 'react-native-paper';
import CardView from '../../../components/CardView';
import CafeteriaView from '../../cafeteria/CafeteriaView';
import {StyleSheet, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import PaperPresets from '../../../components/utils/PaperPresets';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingOptionsList'>;
  cafeteria: CafeteriaView;
};

export default function BookableCafeteriaItem({navigation, cafeteria}: Props) {
  const goToDetails = () => navigation.navigate('BookingOptionsDetail', {cafeteria});

  return (
    <CardView style={styles.container}>
      <Text style={styles.emojiText}>😋</Text>
      <Text style={styles.titleText}>{cafeteria.displayName}</Text>
      <Text style={styles.descriptionText}>{cafeteria.comment}</Text>
      <Button {...PaperPresets.wideThemedButton} style={styles.makeBookingButton} onPress={goToDetails}>
        {cafeteria.displayName} 예약하기
      </Button>
    </CardView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 21,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 42,
  },
  titleText: {
    ...palette.textSubHeader,
    marginTop: 12,
  },
  descriptionText: {
    ...palette.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  makeBookingButtonLabel: {
    ...palette.textPrimary,
    color: colors.white,
    paddingVertical: 4,
  },

  makeBookingButton: {
    alignSelf: 'stretch',
    marginTop: 21,
  },
});
