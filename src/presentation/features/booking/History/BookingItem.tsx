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

import React, {useState} from 'react';
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
import colors from '../../../res/colors';

type Props = {
  booking: BookingView;
};

export default function BookingItem({booking}: Props) {
  const {bookingStore} = useStores();

  const [toggleBrightness] = useScreenBrightness();

  const [dimmed, setDimmed] = useState(booking.dimOut);
  const [badge, setBadge] = useState(booking.badgeLabel);

  const onCardClick = () => {
    if (booking.showQrCode) {
      toggleBrightness();
    }

    setDimmed(false);
    setBadge(undefined);
  };

  const computedStyles = StyleSheet.create({
    cardContent: {
      opacity: dimmed ? 0.25 : 1.0,
    },
  });

  const promptDelete = () =>
    cancelBookingAlert('예약 취소', '예약을 취소할까요?', () =>
      bookingStore.cancelBooking(booking.id).catch(handleApiError),
    );

  return (
    <CardView style={styles.bookingCard} onPress={onCardClick}>
      <View style={computedStyles.cardContent}>
        <Text style={palette.textSecondary}>{booking.timeSlotDateString}</Text>

        <View style={styles.titleContainer}>
          <Text style={palette.textHeader}>{booking.cafeteriaTitle}</Text>
          <Text style={palette.textHeader}>{booking.timeSlotShortTimeString}</Text>
        </View>

        <View style={styles.bodyContainer}>
          <Text style={palette.textPrimary}>{booking.checkInAvailableTimeExplanation}</Text>
        </View>

        <View style={styles.qrcodeContainer}>
          {booking.showQrCode ? (
            <BorderedQRCode value={booking.uuid} showBorderAnimation={booking.showBorderAnimation} />
          ) : (
            <Text style={styles.qrSubstituteEmoji}>{booking.consumedQrCodeSubstitute}</Text>
          )}
        </View>

        <View style={styles.extraContainer}>
          <Text style={palette.textSecondary}>예약 확인 번호</Text>
          <Text style={palette.textSecondary}>{booking.uuid.split('-').pop()}</Text>
        </View>

        <View style={styles.extraContainer}>
          <Text style={palette.textSecondary}>식당 확인 식별자</Text>
          <Text style={palette.textSecondary}>{booking.cafeteriaId}</Text>
        </View>

        {booking.cancelable && (
          <Button {...PaperPresets.wideNeutralButton} style={styles.topSpaced} onPress={promptDelete}>
            예약 취소
          </Button>
        )}
      </View>

      {badge && (
        <View style={styles.absoluteOverlay}>
          <Text style={styles.badgeLabelText}>{badge}</Text>
        </View>
      )}
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
  bodyContainer: {
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
  absoluteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrSubstituteEmoji: {
    fontSize: 80,
  },
  badgeLabelText: {
    ...palette.textSubHeader,
    width: '100%',
    padding: 8,
    textAlign: 'center',
    backgroundColor: colors.sectionHeaderBackground,
  },
});
