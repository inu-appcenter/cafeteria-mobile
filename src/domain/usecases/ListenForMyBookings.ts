/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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

import UseCase from './UseCase';
import Booking from '../entities/Booking';
import BookingRepository from '../../data/repositories/BookingRepository';

type Params = {
  onBookings?: (bookings: Booking[]) => void;
};

/**
 * SSE로 예약 내역을 구독합니다.
 * 인자로 undefined를 넘기면 구독 중단입니다.
 */
class ListenForMyBookings extends UseCase<Params, void> {
  constructor(private readonly bookingRepository: BookingRepository) {
    super();
  }

  async onExecute({onBookings}: Params): Promise<void> {
    if (onBookings == null) {
      this.bookingRepository.stopListeningForMyBookings();
    } else {
      this.bookingRepository.listenForMyBookings(onBookings);
    }
  }
}

export default new ListenForMyBookings(BookingRepository.instance);
