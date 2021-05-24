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

import Cache from './Cache';

export default class PairedCache<K, V> {
  private caches: Map<K, Cache<V>> = new Map();

  set(key: K, value: V) {
    if (this.caches.get(key) === undefined) {
      this.caches.set(key, new Cache<V>());
    }

    this.caches.get(key)?.set(value);
  }

  get(key: K) {
    return this.caches.get(key)?.get();
  }

  isValid(key: K) {
    return this.caches.get(key)?.isValid() || false;
  }
}

export async function pairCachedFetch<K, V>(
  cache: PairedCache<K, V>,
  key: K,
  fetch: () => V,
) {
  if (!cache.isValid(key)) {
    cache.set(key, await fetch());
  }

  return cache.get(key);
}
