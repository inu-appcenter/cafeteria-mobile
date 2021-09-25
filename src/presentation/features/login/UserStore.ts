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

import User from '../../../domain/entities/User';
import Login from '../../../domain/usecases/Login';
import notify from '../../components/utils/notify';
import AgreePrivacyPolicy from '../../../domain/usecases/AgreePrivacyPolicy';
import {makeAutoObservable} from 'mobx';
import RequestGuestChallenge from '../../../domain/usecases/RequestGuestChallenge';
import CheckAgreementRequired from '../../../domain/usecases/CheckAgreementRequired';

export default class UserStore {
  private _user?: User = undefined; // 기본값 달아주어야 합니다.
  get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
  }

  private _isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  set isLoggedIn(value) {
    this._isLoggedIn = value;
  }

  private _isLoggedInAsStudent: boolean = false;
  get isLoggedInAsStudent() {
    return this._isLoggedInAsStudent;
  }
  set isLoggedInAsStudent(value) {
    this._isLoggedInAsStudent = value;
  }

  private _isTryingRememberedLogin: boolean = false;
  get isTryingRememberedLogin() {
    return this._isTryingRememberedLogin;
  }
  set isTryingRememberedLogin(value) {
    this._isTryingRememberedLogin = value;
  }

  private _isAgreementRequired: boolean = false;
  get isAgreementRequired() {
    return this._isAgreementRequired;
  }
  set isAgreementRequired(value) {
    this._isAgreementRequired = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 학번과 포탈 비밀번호로 로그인합니다.
   *
   * @param studentId 학번.
   * @param password 포탈 비밀번호.
   */
  async studentLogin(studentId: string, password: string) {
    try {
      await Login.run({studentId, password});

      await this.onLoginSuccess();
    } catch (e) {
      await this.onLoginFail();
      throw e;
    }
  }

  /**
   * 게스트 로그인을 위해 휴대전화 번호로 인증코드 발송을 요청합니다.
   *
   * @param phoneNumber 사용할 휴대전화 번호.
   */
  async guestChallenge(phoneNumber: string) {
    await RequestGuestChallenge.run({phoneNumber});
  }

  /**
   * 휴대전화 번호와 인증코드로 로그인합니다.
   *
   * @param phoneNumber 휴대전화 번호.
   * @param passcode 인증번호.
   */
  async guestLogin(phoneNumber: string, passcode: string) {
    try {
      await Login.run({phoneNumber, passcode});

      await this.onLoginSuccess();
    } catch (e) {
      await this.onLoginFail();
      throw e;
    }
  }

  /**
   * 저장된 사용자 정보를 기반으로 자동 로그인 합니다.
   */
  async rememberedLogin() {
    const savedUserInfo = await User.find();
    if (savedUserInfo == null) {
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
    const user = await User.find();
    if (user == null) {
      console.error('로그인 성공했다면서 저장된 사용자가 없다구요!?!?');
      return;
    }

    console.log('로그인된 사용자: ', user);

    this.user = user;
    this.isLoggedIn = true;
    this.isLoggedInAsStudent = user.isStudent;

    // 어떤 경로로 로그인하든, 로그인 성공시에는 개인정보처리방침 동의가 필요한지 체크합니다.
    await this.checkAgreementRequired();
  }

  private async onLoginFail() {
    this.user = undefined;
    this.isLoggedIn = false;
    this.isLoggedInAsStudent = false;
  }

  // TODO
  async logout() {
    await this.onLoginFail();
  }

  /**
   * 개인정보처리방침 동의가 필요한지 확인합니다.
   */
  async checkAgreementRequired() {
    // TODO [런칭 후 수정]
    // this.isAgreementRequired = await CheckAgreementRequired.run();
  }

  /**
   * 개인정보처리방침에 동의합니다.
   */
  async agreePrivacyPolicy() {
    await AgreePrivacyPolicy.run();

    notify(`${new Date().toLocaleDateString()} 개인정보 수집 및 제공 동의가 완료되었습니다.`);

    this.isAgreementRequired = false;
  }
}
