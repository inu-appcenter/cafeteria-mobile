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

export default class Cache<T> {
  private value?: T = undefined;
  private dirty: boolean = true;

  set(value: T) {
    this.value = value;
    this.dirty = false;
  }

  get() {
    if (this.dirty) {
      throw new Error('캐시가 더러워요! 퉤!');
    }

    return this.value;
  }

  isValid() {
    return !this.isEmpty() && !this.isDirty();
  }

  isEmpty() {
    return this.dirty === undefined;
  }

  isDirty() {
    return this.dirty;
  }

  markDirty() {
    this.dirty = true;
  }
}

export async function cachedFetch<T>(cache: Cache<T>, fetch: () => T) {
  if (!cache.isValid()) {
    cache.set(await fetch());
  }

  return cache.get();
}
