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
import {Text, View} from 'react-native';
import PaperPresets from '../../../components/utils/PaperPresets';
import BorderedQRCode from './BorderedQRCode';
import handleApiError from '../../../../common/utils/handleApiError';
import useScreenBrightness from '../../../hooks/useScreenBrightness';
import {cancelBookingAlert} from '../../../components/utils/alert';

type Props = {
  booking: BookingView;
};

export default function BookingItem({booking}: Props) {
  const {bookingStore} = useStores();

  const [toggleBrightness] = useScreenBrightness();

  return (
    <CardView
      style={{
        marginHorizontal: 16,
        marginTop: 21,
        padding: 16,
      }}
      onPress={toggleBrightness}>
      <Text style={palette.textSecondary}>{booking.timeSlotDateString}</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
        <Text style={palette.textHeader}>{booking.cafeteriaTitle}</Text>
        <Text style={palette.textHeader}>{booking.timeSlotShortTimeString}</Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginVertical: 12,
        }}>
        <BorderedQRCode value={booking.uuid} />
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
        <Text style={palette.textSecondary}>예약 확인 번호</Text>
        <Text style={palette.textSecondary}>{booking.uuid.split('-').pop()}</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
        <Text style={palette.textSecondary}>식당 확인 식별자</Text>
        <Text style={palette.textSecondary}>{booking.cafeteriaId}</Text>
      </View>

      <Button
        {...PaperPresets.wideNeutralButton}
        style={{marginTop: 12}}
        onPress={() =>
          cancelBookingAlert('예약 취소', '예약을 취소할까요?', () =>
            bookingStore.cancelBooking(booking.id).catch(handleApiError),
          )
        }>
        예약 취소
      </Button>
    </CardView>
  );
}
