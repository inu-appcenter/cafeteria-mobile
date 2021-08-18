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

import BookingOptionView from './BookingOptionView';
import BookingOption from '../../../domain/entities/BookingOption';
import Cafeteria from '../../../domain/entities/Cafeteria';

export default class CafeteriaWithBookingOptionsView {
  key: string;
  title: string;
  options: BookingOptionView[];

  static manyFromBookingOptionsAndCafeteria(
    options: BookingOption[],
    allCafeteria: Cafeteria[],
  ): CafeteriaWithBookingOptionsView[] {
    const cafeteriaIds = [...new Set(options.map(option => option.cafeteriaId))]; // 유니크!

    return cafeteriaIds.map(id => {
      const cafeteria = allCafeteria.find(c => c.id === id)!;
      const optionsOfThisCafeteria = options.filter(option => option.cafeteriaId === id);

      return {
        key: `${cafeteria.id}`,
        title: cafeteria.displayName,
        options: optionsOfThisCafeteria.map(option => BookingOptionView.fromBookingOption(option)),
      };
    });
  }
}
