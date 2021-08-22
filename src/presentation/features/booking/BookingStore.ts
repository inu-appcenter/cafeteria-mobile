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

import MakeBooking from '../../../domain/usecases/MakeBooking';
import BookingView from './BookingView';
import CafeteriaView from '../cafeteria/CafeteriaView';
import CancelBooking from '../../../domain/usecases/CancelBooking';
import GetMyBookings from '../../../domain/usecases/GetMyBookings';
import CafeteriaStore from '../cafeteria/CafeteriaStore';
import GetBookingOptions from '../../../domain/usecases/GetBookingOptions';
import BookingOptionView from './BookingOptionView';
import {makeAutoObservable} from 'mobx';

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

  private _myBookings?: BookingView[] = [];
  get myBookings() {
    return this._myBookings;
  }
  set myBookings(value) {
    this._myBookings = value;
  }

  get hasBookings() {
    return this._myBookings != null && this._myBookings.length > 0;
  }

  constructor(private readonly cafeteriaStore: CafeteriaStore) {
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
    if (this.currentOption == null) {
      return;
    }

    await MakeBooking.run({
      cafeteriaId: this.currentOption.cafeteriaId,
      timeSlot: new Date(this.currentOption.timeSlotTimestamp),
    });

    this.currentOption = undefined;
  }

  async dismissCurrentOption() {
    this.currentOption = undefined;
  }

  async fetchMyBookings() {
    const myBookings = await GetMyBookings.run();
    const allCafeteria = this.cafeteriaStore.cafeteria;

    this.myBookings = myBookings.map(b =>
      BookingView.fromBooking(b, allCafeteria.find(c => c.id === b.cafeteriaId)!),
    );
  }

  async cancelBooking(bookingId: number) {
    await CancelBooking.run({bookingId});

    await this.fetchMyBookings();
  }
}
