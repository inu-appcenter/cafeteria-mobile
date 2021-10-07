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

import {Expose, Type} from 'class-transformer';

export default class Booking {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  cafeteriaId: number;

  @Expose()
  @Type(() => Date)
  timeSlotStart: Date;

  @Expose()
  @Type(() => Date)
  timeSlotEnd: Date;

  @Expose()
  @Type(() => Date)
  bookedAt: Date;

  @Expose()
  status: string;

  get isAvailable() {
    return this.status === 'UNUSED_AVAILABLE';
  }

  get isLate() {
    return this.status === 'UNUSED_LATE';
  }

  get isUsed() {
    return this.status === 'USED';
  }

  get statusLabel() {
    if (this.isAvailable) {
      return undefined;
    } else if (this.isLate) {
      return '사용 불가능한 예약입니다.';
    } else if (this.isUsed) {
      return '입장 완료된 예약입니다.';
    } else {
      return undefined;
    }
  }
}
