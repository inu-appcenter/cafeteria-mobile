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
import UserRepository from '../../data/repositories/UserRepository';

type Params = {
  id: string;
  password: string;
};

class Login extends UseCase<Params | void> {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async onExecute(params: Params | void): Promise<void> {
    if (params === undefined) {
      return this.tryLoginWithSavedCredentials();
    } else {
      return this.tryLoginWithUserInput(params);
    }
  }

  private async tryLoginWithSavedCredentials() {
    const credentials = await this.userRepository.getSavedUserInfo();
    if (credentials === undefined) {
      throw new Error('저장된 사용자 정보가 없어요!');
    }

    console.log(`학번이 ${credentials.id} 이신 분 자동로그인 하십니다.`);

    const {token, barcode} = await this.userRepository.loginWithIdAndToken(
      credentials.id,
      credentials.token,
    );

    await this.userRepository.saveUserInfo({
      id: credentials.id,
      token: token,
      barcode: barcode,
    });
  }

  private async tryLoginWithUserInput(params: Params) {
    const {token, barcode} = await this.userRepository.loginWithIdAndPassword(
      params.id,
      params.password,
    );

    await this.userRepository.saveUserInfo({
      id: params.id,
      token: token,
      barcode: barcode,
    });
  }
}

export default new Login(UserRepository.instance);
