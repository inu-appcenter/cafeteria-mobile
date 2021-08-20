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

import {makeAutoObservable} from 'mobx';
import GetBookingOptions from '../../../domain/usecases/GetBookingOptions';
import BookingOptionView from './BookingOptionView';
import MakeBooking from '../../../domain/usecases/MakeBooking';
import CafeteriaView from '../cafeteria/CafeteriaView';

export default class BookingStore {
  private _bookingOptions: Map<number, BookingOptionView[]> = new Map();
  getBookingOptions(cafeteriaId: number) {
    return this._bookingOptions.get(cafeteriaId) ?? [];
  }
  setBookingOptions(cafeteriaId: number, options: BookingOptionView[]) {
    this._bookingOptions.set(cafeteriaId, options);
  }

  private _currentOption?: BookingOptionView = undefined;
  get currentOption() {
    return this._currentOption;
  }

  set currentOption(value) {
    this._currentOption = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBookingOptions(cafeteria: CafeteriaView) {
    const bookingOptions = await GetBookingOptions.run({cafeteriaId: cafeteria.id});

    this.setBookingOptions(
      cafeteria.id,
      bookingOptions.map(option => BookingOptionView.fromBookingOption(option, cafeteria)),
    );
  }

  async askToConfirm(option: BookingOptionView) {
    this.currentOption = option;
  }

  async confirmCurrentOption() {
    await this.makeBooking(this.currentOption!);

    this.currentOption = undefined;
  }

  private async makeBooking(option: BookingOptionView) {
    await MakeBooking.run({
      cafeteriaId: option.cafeteriaId,
      timeSlot: new Date(option.timeSlotTimestamp),
    });
  }

  async dismissCurrentOption() {
    this.currentOption = undefined;
  }
}
