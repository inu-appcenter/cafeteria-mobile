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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import CardView from '../../../components/CardView';
import useStores from '../../../hooks/useStores';
import {StyleSheet, Text, View} from 'react-native';

export default function NoBookingsView() {
  const {bookingStore} = useStores();

  const onboardingHint = (
    <CardView style={styles.hintContainer}>
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

  return (
    <View style={[palette.centeringContainer, palette.whiteBackground]}>
      <View style={styles.emptyViewContainer}>
        <Icon name="ticket-confirmation" size={112} color={colors.textTertiary} />
        <Text style={styles.emptyViewTitle}>😉 예약 내역이 여기에 나타나요</Text>
        <Text style={styles.emptyViewBody}>오른쪽 아래 버튼을 눌러서{'\n'}새로운 예약을 만들어보세요 :)</Text>
      </View>

      {!bookingStore.usedToBookingFeature && onboardingHint}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyViewContainer: {
    ...palette.centeringContainer,
    margin: 21,
    paddingBottom: 128,
  },
  emptyViewTitle: {
    ...palette.textSubHeader,
    marginTop: 24,
  },
  emptyViewBody: {
    ...palette.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },

  hintContainer: {
    position: 'absolute',
    padding: 16,
    bottom: 84,
    left: 16,
    right: 16,
  },
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
