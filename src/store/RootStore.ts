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

import QnAStore from '../presentation/features/support/QnA/QnAStore';
import UserStore from '../presentation/features/login/UserStore';
import NoticeStore from '../presentation/features/support/Notices/NoticeStore';
import VersionStore from '../presentation/features/support/Version/VersionStore';
import HardwareStore from '../presentation/features/hardware/HardwareStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import BookingStore from '../presentation/features/booking/BookingStore';

export default class RootStore {
  qnaStore = new QnAStore();
  userStore = new UserStore();
  noticeStore = new NoticeStore();
  versionStore = new VersionStore();
  hardwareStore = new HardwareStore();
  cafeteriaStore = new CafeteriaStore();
  bookingStore = new BookingStore(this.cafeteriaStore);

  private initializationStarted = false;

  startInitialization() {
    if (this.initializationStarted) {
      return;
    }

    this.initialize();

    this.initializationStarted = true;
  }

  private async initialize() {
    // 로그인이 필요한 flow
    const loggingIn = () => this.userStore.rememberedLogin();
    const fetchingMyBookings = () => this.bookingStore.fetchMyBookings();

    // 로그인이 필요없는 flow
    const gettingCafeteria = () => this.cafeteriaStore.fetchCafeteria();
    const fetchingNewNotice = () => this.noticeStore.fetchNewNotice();
    const fetchOnboardingShownStatus = () => this.bookingStore.fetchOnboardingShownStatus();

    const thoseNeedLogin = loggingIn()
      .then(fetchingMyBookings)
      .catch(e => console.log(`[로그인하기 & 예약 내역 가져오기]에 실패했습니다: ${e}`));

    const thoseNeedNoLogin = Promise.all([
      gettingCafeteria(),
      fetchingNewNotice(),
      fetchOnboardingShownStatus(),
    ]).catch(e =>
      console.log(
        `[카페테리아 & 새 공지 & 예약 온보딩 화면 보여주었는지 여부]를 가져오는 데에 실패했습니다: ${e}`,
      ),
    );

    await Promise.all([thoseNeedLogin, thoseNeedNoLogin]);
  }
}
