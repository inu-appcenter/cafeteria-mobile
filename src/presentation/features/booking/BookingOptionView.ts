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

import BookingOption from '../../../domain/entities/BookingOption';
import {formatDate, formatTime} from '../../../common/utils/Date';
import CafeteriaView from '../cafeteria/CafeteriaView';

export default class BookingOptionView {
  key: string;
  cafeteriaId: number;
  cafeteriaTitle: string;
  timeSlotTimestamp: number;
  timeSlotDateString: string;
  timeSlotTimeString: string;
  used: number;
  capacity: number;
  full: boolean;

  static fromBookingOption(option: BookingOption, cafeteria: CafeteriaView): BookingOptionView {
    return {
      key: `booking-option-${option.cafeteriaId}-${option.timeSlot.getTime()}`,
      cafeteriaId: option.cafeteriaId,
      cafeteriaTitle: cafeteria.displayName,
      timeSlotTimestamp: option.timeSlot.getTime(),
      timeSlotDateString: formatDate(option.timeSlot),
      timeSlotTimeString: formatTime(option.timeSlot),
      used: option.used,
      capacity: option.capacity,
      full: option.used >= option.capacity,
    };
  }
}
