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

import colors from '../../res/colors';
import BookingOption from '../../../domain/entities/BookingOption';
import CafeteriaView from '../cafeteria/CafeteriaView';
import {formatDate, formatTime} from '../../../common/utils/Date';

export default class BookingOptionView {
  key: string;
  cafeteriaId: number;
  cafeteriaTitle: string;
  timeSlotTimestamp: number;
  timeSlotDateString: string;
  timeSlotTimeString: string;
  used: number;
  left: number;
  capacity: number;
  full: boolean;
  statusText: string;
  statusColor: string;

  static fromBookingOption(option: BookingOption, cafeteria: CafeteriaView): BookingOptionView {
    const left = option.capacity - option.used;
    const full = option.used >= option.capacity;
    const statusText = full ? '마감되었습니다.' : `${left}자리 남음`;

    const underHalf = left < option.capacity * 0.5;
    const almostGone = left < option.capacity * 0.2;

    const statusColor = almostGone ? colors.textRed : underHalf ? colors.textOrange : colors.textGreen;

    return {
      key: `booking-option-${option.cafeteriaId}-${option.timeSlot.getTime()}`,
      cafeteriaId: option.cafeteriaId,
      cafeteriaTitle: cafeteria.displayName,
      timeSlotTimestamp: option.timeSlot.getTime(),
      timeSlotDateString: formatDate(option.timeSlot),
      timeSlotTimeString: formatTime(option.timeSlot),
      used: option.used,
      left,
      capacity: option.capacity,
      full,
      statusText,
      statusColor,
    };
  }
}
