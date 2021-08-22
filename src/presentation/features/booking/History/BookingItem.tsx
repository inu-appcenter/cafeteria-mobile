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
import palette from '../../../res/palette';
import CardView from '../../../components/CardView';
import {Button} from 'react-native-paper';
import useStores from '../../../hooks/useStores';
import BookingView from '../BookingView';
import PaperPresets from '../../../components/utils/PaperPresets';
import BorderedQRCode from './BorderedQRCode';
import handleApiError from '../../../../common/utils/handleApiError';
import useScreenBrightness from '../../../hooks/useScreenBrightness';
import {cancelBookingAlert} from '../../../components/utils/alert';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  booking: BookingView;
};

export default function BookingItem({booking}: Props) {
  const {bookingStore} = useStores();

  const [toggleBrightness] = useScreenBrightness();

  const promptDelete = () =>
    cancelBookingAlert('예약 취소', '예약을 취소할까요?', () =>
      bookingStore.cancelBooking(booking.id).catch(handleApiError),
    );

  return (
    <CardView style={styles.bookingCard} onPress={toggleBrightness}>
      <Text style={palette.textSecondary}>{booking.timeSlotDateString}</Text>

      <View style={styles.titleContainer}>
        <Text style={palette.textHeader}>{booking.cafeteriaTitle}</Text>
        <Text style={palette.textHeader}>{booking.timeSlotShortTimeString}</Text>
      </View>

      <View style={styles.qrcodeContainer}>
        <BorderedQRCode value={booking.uuid} />
      </View>

      <View style={styles.extraContainer}>
        <Text style={palette.textSecondary}>예약 확인 번호</Text>
        <Text style={palette.textSecondary}>{booking.uuid.split('-').pop()}</Text>
      </View>

      <View style={styles.extraContainer}>
        <Text style={palette.textSecondary}>식당 확인 식별자</Text>
        <Text style={palette.textSecondary}>{booking.cafeteriaId}</Text>
      </View>

      <Button {...PaperPresets.wideNeutralButton} style={styles.topSpaced} onPress={promptDelete}>
        예약 취소
      </Button>
    </CardView>
  );
}

const styles = StyleSheet.create({
  bookingCard: {
    marginHorizontal: 22,
    marginTop: 21,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  qrcodeContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  extraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  topSpaced: {
    marginTop: 12,
  },
});
