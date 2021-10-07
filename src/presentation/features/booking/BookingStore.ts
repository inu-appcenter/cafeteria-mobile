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
import AsyncStorage from '@react-native-async-storage/async-storage';
import CafeteriaView from '../cafeteria/CafeteriaView';
import CancelBooking from '../../../domain/usecases/CancelBooking';
import GetMyBookings from '../../../domain/usecases/GetMyBookings';
import CafeteriaStore from '../cafeteria/CafeteriaStore';
import GetBookingOptions from '../../../domain/usecases/GetBookingOptions';
import BookingOptionView from './BookingOptionView';
import {makeAutoObservable} from 'mobx';
import GroupedBookingOptionsView from './GroupedBookingOptionsView';

export default class BookingStore {
  private _onboardingHasShown = false;
  get onboardingHasShown() {
    return this._onboardingHasShown;
  }
  set onboardingHasShown(value) {
    this._onboardingHasShown = value;
  }

  protected _usedToBookingFeature = false;
  get usedToBookingFeature() {
    return this._usedToBookingFeature;
  }
  set usedToBookingFeature(value) {
    this._usedToBookingFeature = value;
  }

  private _groupedBookingOptions: Map<number, GroupedBookingOptionsView> = new Map();
  getGroupedBookingOptions(cafeteriaId: number) {
    return this._groupedBookingOptions.get(cafeteriaId);
  }
  setGroupedBookingOptions(cafeteriaId: number, options: GroupedBookingOptionsView) {
    this._groupedBookingOptions.set(cafeteriaId, options);
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
    return this._myBookings ?? [];
  }
  set myBookings(value) {
    this._myBookings = value;
  }

  get hasBookings(): boolean {
    return this.myBookings.length > 0;
  }

  get activeBookings(): BookingView[] {
    return this.myBookings.filter(booking => booking.isActive);
  }

  get hasActiveBookings(): boolean {
    return this.activeBookings.length > 0;
  }

  constructor(private readonly cafeteriaStore: CafeteriaStore) {
    makeAutoObservable(this);
  }

  async fetchFlags() {
    this.onboardingHasShown = (await AsyncStorage.getItem('booking_onboarding_has_shown')) === 'true';
    this.usedToBookingFeature = (await AsyncStorage.getItem('used_to_booking_feature')) === 'true';
  }

  /**
   * 온보딩 완료로 마크하고 플래그를 영속합니다.
   */
  async doneOnboarding() {
    this.onboardingHasShown = true;
    await this.persistFlags();
  }

  /**
   * 온보딩 필요로 마크하나, 플래그를 영속하지는 않습니다.
   * 온보딩을 완료한 사람에게도 한 번 보여주기 위한 용도입니다.
   */
  async showOnboardingOnce() {
    this.onboardingHasShown = false;
  }

  protected async persistFlags() {
    await AsyncStorage.setItem('booking_onboarding_has_shown', String(this.onboardingHasShown));
    await AsyncStorage.setItem('used_to_booking_feature', String(this.usedToBookingFeature));
  }

  async fetchBookingOptions(cafeteria: CafeteriaView) {
    const bookingOptions = await GetBookingOptions.run({cafeteriaId: cafeteria.id});

    this.setGroupedBookingOptions(
      cafeteria.id,
      GroupedBookingOptionsView.fromBookingOptionsAndCafeteria(bookingOptions, cafeteria),
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
      timeSlotStart: new Date(this.currentOption.timeSlotTimestamp),
    });

    this.currentOption = undefined;

    // 예약을 1회 이상 한 시점에서는
    // usedToBookingFeature(예약 기능에 익숙한가)가 true.
    this.usedToBookingFeature = true;
    await this.persistFlags();
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
