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

import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import colors from '../../../res/colors';
import {Alert} from 'react-native';
import palette from '../../../res/palette';

export default function BookingInfoHeaderButton() {
  const showBookingInfo = async () => {
    Alert.alert(
      `예약 내역 안내`,
      `체크인하지 않은 예약 중 아직 예약 일시가 다가오지 않은 예약이 여기에 표시됩니다.`,
    );
  };

  return (
    <Icon
      name={'info'}
      size={24}
      color={colors.textPrimary}
      style={palette.iconHeaderButton}
      onPress={showBookingInfo}
    />
  );
}
