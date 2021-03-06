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

import UseCase from './UseCase';
import UserRepository from '../../data/repositories/UserRepository';
import User from '../entities/User';
import assert from 'assert';

type StudentLoginParams = {
  studentId: string;
  password: string;
};

type GuestLoginParams = {
  phoneNumber: string;
  passcode: string;
};

type Params = StudentLoginParams | GuestLoginParams;

class Login extends UseCase<Params | void> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(params: Params | void): Promise<void> {
    if (params == null) {
      return this.tryLoginWithSavedCredentials();
    } else {
      return this.tryLoginWithUserInput(params);
    }
  }

  private async tryLoginWithSavedCredentials() {
    const user = await User.find();

    assert(user, '저장된 사용자 정보가 없어요!');

    console.log(`${user.description} 자동로그인 하십니다.`);

    return await this.loginAndSaveResult(user, user.rememberMeLoginParams);
  }

  private async tryLoginWithUserInput(params: Params) {
    const user = User.create(params);

    return await this.loginAndSaveResult(user, params);
  }

  private async loginAndSaveResult(user: User, loginParams: Record<string, string | undefined>) {
    const result = await this.userRepository.login(loginParams);

    user.update(result);

    await user.save();
  }
}

export default new Login(UserRepository.instance);
