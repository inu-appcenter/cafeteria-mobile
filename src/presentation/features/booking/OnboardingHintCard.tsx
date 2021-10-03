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
import colors from '../../res/colors';
import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import CardView from '../../components/CardView';
import useStores from '../../hooks/useStores';
import {StyleSheet, Text, ViewStyle} from 'react-native';

type Props = {
  style?: ViewStyle;
};

export default function OnboardingHintCard({style}: Props) {
  const {bookingStore} = useStores();

  return (
    <CardView style={style}>
      <Text style={styles.hintTitle}>새로운 예약 기능에 대해 알려 드릴까요?</Text>
      <Button
        mode="contained"
        style={styles.hintButton}
        color={colors.textSecondary}
        onPress={() => bookingStore.showOnboardingOnce()}>
        알아보기
      </Button>
    </CardView>
  );
}

const styles = StyleSheet.create({
  hintTitle: {
    ...palette.textSecondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  hintButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
});
