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

export default abstract class ApiError extends Error {
  protected abstract defaultMessage: string;

  constructor(protected readonly statusCode?: number, protected readonly error?: string, message?: string) {
    super(message);
  }

  get message(): string {
    return super.message || this.defaultMessage || `😔 미처 처리하지 못한 오류입니다!`;
  }
}

export type ApiErrorConstructorType = {
  new (statusCode?: number, error?: string, message?: string): ApiError;
};
