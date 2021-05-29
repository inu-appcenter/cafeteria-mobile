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

import codePush, {Package} from 'react-native-code-push';
import {makeAutoObservable} from 'mobx';

export default class VersionStore {
  private _runningUpdate?: Package = undefined; // 대입 꼭 필요!
  get runningUpdate() {
    return this._runningUpdate;
  }
  set runningUpdate(value) {
    this._runningUpdate = value;
  }

  private _pendingUpdate?: Package = undefined;
  get pendingUpdate() {
    return this._pendingUpdate;
  }
  set pendingUpdate(value) {
    this._pendingUpdate = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async fetchVersionInfo() {
    this.runningUpdate = await this.fetchMetadata(codePush.UpdateState.RUNNING);
    this.pendingUpdate = await this.fetchMetadata(codePush.UpdateState.PENDING);
  }

  private async fetchMetadata(state: codePush.UpdateState) {
    const result = await codePush.getUpdateMetadata(state);

    return result || undefined;
  }
}
