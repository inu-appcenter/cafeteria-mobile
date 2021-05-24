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

import User from '../../domain/entities/User';
import axios from 'axios';
import Config from '../../common/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class UserRepository {
  static instance = new UserRepository();

  private url = {
    login: `${Config.baseUrl}/login`,
    activateBarcode: `${Config.baseUrl}/activateBarcode`,
  };

  async loginWithIdAndPassword(id: string, password: string) {
    return this.login({id, password});
  }

  async loginWithIdAndToken(id: string, token: string) {
    return this.login({id, token});
  }

  private async login(params: object) {
    const {data} = await axios.post(this.url.login, params);

    return {
      token: data.token,
      barcode: data.barcode,
    };
  }

  async hasSavedUserInfo() {
    return (await this.getSavedUserInfo()) !== undefined;
  }

  async getSavedUserInfo() {
    const serializedUserInfo = await AsyncStorage.getItem(
      'user_info_serialized',
    );
    if (serializedUserInfo === null) {
      return undefined;
    }

    return JSON.parse(serializedUserInfo) as User;
  }

  async saveUserInfo(user: User) {
    await AsyncStorage.setItem('user_info_serialized', JSON.stringify(user));
  }

  async removeUserInfo() {
    await AsyncStorage.removeItem('user_credentials_serialized');
  }

  async activateBarcode() {
    await axios.put(this.url.activateBarcode);
  }
}
