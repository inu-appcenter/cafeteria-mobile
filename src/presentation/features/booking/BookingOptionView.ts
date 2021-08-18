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
import {formatTime} from '../../../common/utils/Date';

export default class BookingOptionView {
  key: string;
  cafeteriaId: number;
  timeSlotTimestamp: number;
  timeSlotDisplayString: string;
  used: number;
  capacity: number;

  static fromBookingOption(option: BookingOption): BookingOptionView {
    return {
      key: `${option.cafeteriaId}-${option.timeSlot.getTime()}`,
      cafeteriaId: option.cafeteriaId,
      timeSlotTimestamp: option.timeSlot.getTime(),
      timeSlotDisplayString: formatTime(option.timeSlot),
      used: option.used,
      capacity: option.capacity,
    };
  }
}
