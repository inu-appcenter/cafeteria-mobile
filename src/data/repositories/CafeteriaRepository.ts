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

import Menu from '../../domain/entities/Menu';
import axios from 'axios';
import moment from 'moment';
import Config from '../../common/Config';
import Corner from '../../domain/entities/Corner';
import Cafeteria from '../../domain/entities/Cafeteria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {plainToClass} from 'class-transformer';
import Cache, {cachedFetch} from '../../common/utils/Cache';
import PairedCache, {pairCachedFetch} from '../../common/utils/PairedCache';

export default class CafeteriaRepository {
  static instance = new CafeteriaRepository();

  private url = {
    cafeteria: `${Config.baseUrl}/cafeteria`,
    corners: `${Config.baseUrl}/corners`,
    menus: (date: string) => `${Config.baseUrl}/menus?date=${date}&split=true`,
  };

  private cache = {
    cafeteria: new Cache<any>(),
    corners: new Cache<any>(),
    menus: new PairedCache<string, any>(),
  };

  private async fetchCafeteria() {
    return cachedFetch(
      this.cache.cafeteria,
      async () => (await axios.get(this.url.cafeteria)).data,
    );
  }

  private async fetchCorner() {
    return cachedFetch(
      this.cache.corners,
      async () => (await axios.get(this.url.corners)).data,
    );
  }

  private async fetchMenus(dateString: string) {
    return pairCachedFetch(
      this.cache.menus,
      dateString,
      async () => (await axios.get(this.url.menus(dateString))).data,
    );
  }

  async getCafeteria(dateOffset: number) {
    const dateStringAfterOffset = moment()
      .add(dateOffset, 'days')
      .format('YYYYMMDD');

    return new FetchResultReducer(
      await this.fetchCafeteria(),
      await this.fetchCorner(),
      await this.fetchMenus(dateStringAfterOffset),
    ).reduce();
  }

  async getCafeteriaOnly() {
    return new FetchResultReducer(await this.fetchCafeteria()).reduce(false);
  }

  async saveOrders(orderedCafeteriaIds: number[]) {
    await AsyncStorage.setItem(
      'cafeteria_ordered_ids',
      JSON.stringify(orderedCafeteriaIds),
    );
  }

  async getOrders(): Promise<number[]> {
    const saved = await AsyncStorage.getItem('cafeteria_ordered_ids');
    if (saved === null) {
      return [];
    }

    return JSON.parse(saved) as number[];
  }
}

class FetchResultReducer {
  constructor(
    private readonly cafeteria: object[],
    private readonly corners?: object[],
    private readonly menus?: object[],
  ) {}

  private transformOptions = {
    excludeExtraneousValues: true,
  };

  private fillCorners(cafeteria: Cafeteria) {
    if (!this.corners) {
      return cafeteria;
    }

    cafeteria.corners = this.corners
      // @ts-ignore
      .filter(rawCorner => rawCorner['cafeteria-id'] === cafeteria.id)
      .map(rawCorner => plainToClass(Corner, rawCorner, this.transformOptions))
      .map(corner => this.fillMenus(corner));

    return cafeteria;
  }

  private fillMenus(corner: Corner) {
    if (!this.menus) {
      return corner;
    }

    corner.menus = this.menus
      // @ts-ignore
      .filter(rawMenu => rawMenu['corner-id'] === corner.id)
      .map(rawMenu => plainToClass(Menu, rawMenu, this.transformOptions));

    return corner;
  }

  reduce(fillContents: boolean = true) {
    const cafeteriaUnfilled = this.cafeteria.map(rawCafeteria =>
      plainToClass(Cafeteria, rawCafeteria, this.transformOptions),
    );

    if (!fillContents) {
      return cafeteriaUnfilled;
    }

    return cafeteriaUnfilled.map(cafeteria => this.fillCorners(cafeteria));
  }
}
