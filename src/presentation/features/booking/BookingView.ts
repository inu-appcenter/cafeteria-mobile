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

import Booking from '../../../domain/entities/Booking';
import CafeteriaView from '../cafeteria/CafeteriaView';
import {formatDate, formatTime} from '../../../common/utils/Date';

export default class BookingView {
  id: number;
  key: string;
  uuid: string;
  cafeteriaId: number;
  cafeteriaTitle: string;
  timeSlotTimestamp: number;
  timeSlotDateString: string;
  timeSlotTimeString: string;

  static fromBooking(booking: Booking, cafeteria: CafeteriaView): BookingView {
    return {
      id: booking.id,
      key: `booking-${booking.uuid}`,
      uuid: booking.uuid,
      cafeteriaId: booking.cafeteriaId,
      cafeteriaTitle: cafeteria.displayName,
      timeSlotTimestamp: booking.timeSlot.getTime(),
      timeSlotDateString: formatDate(booking.timeSlot),
      timeSlotTimeString: formatTime(booking.timeSlot),
    };
  }
}
