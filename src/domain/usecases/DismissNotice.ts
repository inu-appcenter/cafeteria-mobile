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

import UseCase from './UseCase';
import NoticeRepository from '../../data/repositories/NoticeRepository';

class DismissNotice extends UseCase<number | undefined, void> {
  constructor(private readonly noticeRepository: NoticeRepository) {
    super();
  }

  async onExecute(noticeId?: number): Promise<void> {
    if (noticeId === undefined) {
      return;
    }

    await this.noticeRepository.dismissNotice(noticeId);
  }
}

export default new DismissNotice(NoticeRepository.instance);
