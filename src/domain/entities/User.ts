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

import assert from 'assert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Expose, plainToClass} from 'class-transformer';

export default class User {
  @Expose()
  studentId?: string;

  @Expose()
  phoneNumber?: string;

  @Expose()
  rememberMeToken: string;

  @Expose()
  barcode?: string;

  static async find(): Promise<User | undefined> {
    const serializedUserInfo = await AsyncStorage.getItem('user_info_serialized');
    if (serializedUserInfo == null) {
      return undefined;
    }

    return User.parse(serializedUserInfo);
  }

  async save(): Promise<this> {
    await AsyncStorage.setItem('user_info_serialized', this.serialize());

    return this;
  }

  async remove(): Promise<this> {
    await AsyncStorage.removeItem('user_info_serialized');

    return this;
  }

  static parse(serialized: string): User {
    return User.create(JSON.parse(serialized));
  }

  static create(properties: Partial<User>): User {
    const created = plainToClass(User, properties, {excludeExtraneousValues: true});
    created.assertStudentOrGuest();

    return created;
  }

  private assertStudentOrGuest() {
    assert(this.isStudent || this.isGuest, '사용자는 학생 또는 게스트여야 합니다.');
  }

  update(properties: Partial<User>): User {
    return Object.assign(this, properties);
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  get isStudent() {
    return this.studentId != null && this.phoneNumber == null;
  }

  get isGuest() {
    return this.studentId == null && this.phoneNumber != null;
  }

  get identifierName() {
    if (this.isStudent) {
      return '학번';
    } else {
      return '전화번호';
    }
  }

  get identifier() {
    if (this.isStudent) {
      return this.studentId;
    } else {
      return this.phoneNumber;
    }
  }

  get description() {
    if (this.isStudent) {
      return `학번이 ${this.studentId}인 사용자`;
    } else {
      return `전화번호가 ${this.phoneNumber}인 외부 사용자`;
    }
  }

  get rememberMeLoginParams() {
    if (this.isStudent) {
      return {
        studentId: this.studentId!,
        rememberMeToken: this.rememberMeToken,
      };
    } else {
      return {
        phoneNumber: this.phoneNumber!,
        rememberMeToken: this.rememberMeToken,
      };
    }
  }
}
