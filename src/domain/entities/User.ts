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

import assert from 'assert';

export default class User {
  studentId?: string;
  phoneNumber?: string;

  rememberMeToken: string;
  barcode?: string;

  static parse(serialized: string): User {
    return User.create(JSON.parse(serialized));
  }

  static create(properties: Partial<User>): User {
    const created = Object.assign(new User(), properties);
    created.assertStudentOrGuest();

    return created;
  }

  private assertStudentOrGuest() {
    assert(
      this.isStudent() || this.isGuest(),
      new Error('사용자는 학생 또는 외부인이어야 합니다.'),
    );
  }

  update(properties: Partial<User>): User {
    return Object.assign(this, properties);
  }

  serialize() {
    return JSON.stringify(this);
  }

  isStudent() {
    return this.studentId != null && this.phoneNumber == null;
  }

  isGuest() {
    return this.studentId == null && this.phoneNumber != null;
  }

  description() {
    if (this.isStudent()) {
      return `학번이 ${this.studentId}인 사용자`;
    } else {
      return `전화번호가 ${this.phoneNumber}인 외부 사용자`;
    }
  }

  rememberMeLoginParams() {
    if (this.isStudent()) {
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
