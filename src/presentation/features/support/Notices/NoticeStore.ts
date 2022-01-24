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

import NoticeView from './NoticeView';
import GetNewNotice from '../../../../domain/usecases/GetNewNotice';
import DismissNotice from '../../../../domain/usecases/DismissNotice';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import {makeAutoObservable} from 'mobx';
import doLater from '../../../../common/utils/doLater';

export default class NoticeStore {
  private _notices: NoticeView[] = [];
  get notices() {
    return this._notices;
  }
  set notices(value) {
    this._notices = value;
  }

  private _currentNotice?: NoticeView = undefined;
  get currentNotice() {
    return this._currentNotice;
  }
  set currentNotice(value) {
    this._currentNotice = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAllNotices() {
    const notices = await GetAllNotices.run();

    this.notices = notices.map(n => NoticeView.fromNotice(n));
  }

  async fetchNewNotice() {
    const newNotice = await GetNewNotice.run();
    if (newNotice == null) {
      return;
    }

    doLater(() => {
      this.currentNotice = NoticeView.fromNotice(newNotice);
    });
  }

  async dismissCurrentNotice() {
    await DismissNotice.run(this.currentNotice?.id);

    this.currentNotice = undefined;
  }
}
