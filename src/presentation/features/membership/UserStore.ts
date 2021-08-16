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

import Login from '../../../domain/usecases/Login';
import GetUser from '../../../domain/usecases/GetUser';
import {makeAutoObservable} from 'mobx';
import User from '../../../domain/entities/User';

export default class UserStore {
  private _isTryingRememberedLogin: boolean = false;
  get isTryingRememberedLogin() {
    return this._isTryingRememberedLogin;
  }
  set isTryingRememberedLogin(value) {
    this._isTryingRememberedLogin = value;
  }

  private _isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  set isLoggedIn(value) {
    this._isLoggedIn = value;
  }

  private _user?: User;
  get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async login(studentId: string, password: string) {
    try {
      await Login.run({studentId, password});

      await this.onLoginSuccess();
    } catch (e) {
      await this.onLoginFail();
      throw e;
    }
  }

  async rememberedLogin() {
    const savedUserInfo = await GetUser.run();
    if (savedUserInfo === undefined) {
      return;
    }

    try {
      this.isTryingRememberedLogin = true;

      await Login.run();

      await this.onLoginSuccess();
    } catch (e) {
      await this.onLoginFail();
      throw e;
    } finally {
      this.isTryingRememberedLogin = false;
    }
  }

  private async onLoginSuccess() {
    const user = await GetUser.run();
    if (user === undefined) {
      console.error('로그인 성공했다면서 저장된 사용자가 없다구요!?!?');
      return;
    }

    this.isLoggedIn = true;
    this.user = user;
  }

  private async onLoginFail() {
    this.isLoggedIn = false;
    this.user = undefined;
  }
}
