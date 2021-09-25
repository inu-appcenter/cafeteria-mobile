import Config from '../../common/Config';
import axios from 'axios';
import {plainToClass} from 'class-transformer';
import BookingOption from '../../domain/entities/BookingOption';
import Booking from '../../domain/entities/Booking';

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

export default class BookingRepository {
  static instance = new BookingRepository();

  private url = {
    options: (cafeteriaId: number) => `${Config.baseUrl}/booking/options?cafeteriaId=${cafeteriaId}`,
    bookings: `${Config.baseUrl}/booking/bookings`,
    bookingsWithId: (bookingId: number) => `${Config.baseUrl}/booking/bookings/${bookingId}`,
  };

  async getBookingOptions(cafeteriaId: number) {
    return plainToClass(BookingOption, (await axios.get(this.url.options(cafeteriaId))).data as any[], {
      excludeExtraneousValues: true,
    });
  }

  async makeBooking(params: Record<string, any>) {
    await axios.post(this.url.bookings, params);
  }

  async getMyBookings() {
    return plainToClass(Booking, (await axios.get(this.url.bookings)).data as any[], {
      excludeExtraneousValues: true,
    });
  }

  async cancelBooking(bookingId: number) {
    await axios.delete(this.url.bookingsWithId(bookingId));
  }
}
