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

import BookingOption from '../../../domain/entities/BookingOption';
import CafeteriaView from '../cafeteria/CafeteriaView';
import BookingOptionView from './BookingOptionView';
import {formatDateDiffWithDate} from '../../../common/utils/Date';

export default class GroupedBookingOptionsView {
  key: string;

  isEmpty: boolean;
  cafeteriaId: number;
  cafeteriaTitle: string;
  timeSlotDateString: string;

  options: BookingOptionView[];

  static fromBookingOptionsAndCafeteria(
    options: BookingOption[],
    cafeteria: CafeteriaView,
  ): GroupedBookingOptionsView {
    const optionsView = options.map(o => BookingOptionView.fromBookingOption(o, cafeteria));
    const isEmpty = optionsView.length === 0;
    const dateString = isEmpty
      ? '예약 가능한 날짜가 없어요'
      : formatDateDiffWithDate(options[0].timeSlotStart);

    return {
      key: cafeteria.displayName,

      isEmpty: optionsView.length === 0,
      cafeteriaId: cafeteria.id,
      cafeteriaTitle: cafeteria.displayName,
      timeSlotDateString: dateString,

      options: optionsView,
    };
  }
}
