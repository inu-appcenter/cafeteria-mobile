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

import Notice from '../entities/Notice';
import UseCase from './UseCase';
import {Platform} from 'react-native';
import PackageInfo from '../../common/PackageInfo';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class GetNewNotice extends UseCase<void, Notice | undefined> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(params: void): Promise<Notice | undefined> {
    const latestNotice = await this.noticeRepository.getLatestNotice({
      os: Platform.OS,
      appVersion: PackageInfo.version,
    });

    if (latestNotice === undefined) {
      return undefined;
    }

    const dismissedNoticeId = await this.noticeRepository.getDismissedNoticeId();

    if (latestNotice.id <= dismissedNoticeId) {
      // 최신 공지가 사용자에게도 최신이 아니면(확인한 적이 있으면) undefined를 반환하는 것으로 끝냅니다.
      return undefined;
    }

    return latestNotice;
  }
}

export default new GetNewNotice(NoticeRepository.instance);
