import Config from '../../common/Config';
import axios from 'axios';
import {plainToClass} from 'class-transformer';
import BookingOption from '../../domain/entities/BookingOption';

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
  };

  async getBookingOptions(cafeteriaId: number) {
    return plainToClass(BookingOption, (await axios.get(this.url.options(cafeteriaId))).data as any[], {
      excludeExtraneousValues: true,
    });
  }

  async makeBooking(params: Record<string, string | undefined>) {
    await axios.post(this.url.bookings, params);
  }
}
