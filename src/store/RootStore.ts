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

import UserStore from '../presentation/features/membership/UserStore';
import NoticeStore from '../presentation/features/support/Notices/NoticeStore';
import VersionStore from '../presentation/features/support/Version/VersionStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import DirectInquiryStore from '../presentation/features/support/DirectInquery/DirectInquiryStore';

export default class RootStore {
  userStore = new UserStore();
  noticeStore = new NoticeStore();
  versionStore = new VersionStore();
  cafeteriaStore = new CafeteriaStore();
  directInquiryStore = new DirectInquiryStore();

  private initializationStarted = false;

  startInitialization() {
    if (this.initializationStarted) {
      return;
    }

    this.userStore
      .rememberedLogin()
      .catch(e =>
        console.log(`저장된 사용자 정보로 로그인하는 데에 실패했습니다: ${e}`),
      );

    setTimeout(
      () =>
        this.noticeStore
          .fetchNewNotice()
          .catch(e =>
            console.log(`새 공지를 가져오는 데에 실패했습니다: ${e}`),
          ),
      500,
    );

    this.initializationStarted = true;
  }
}
