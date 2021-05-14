import Menu from '../../domain/entities/Menu';
import axios from 'axios';
import moment from 'moment';
import Config from '../../common/Config';
import Corner from '../../domain/entities/Corner';
import Cafeteria from '../../domain/entities/Cafeteria';
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
}

class FetchResultReducer {
  constructor(
    private readonly cafeteria: object[],
    private readonly corners: object[],
    private readonly menus: object[],
  ) {}

  private transformOptions = {
    excludeExtraneousValues: true,
  };

  private fillCorners(cafeteria: Cafeteria) {
    cafeteria.corners = this.corners
      // @ts-ignore
      .filter(rawCorner => rawCorner['cafeteria-id'] === cafeteria.id)
      .map(rawCorner => plainToClass(Corner, rawCorner, this.transformOptions))
      .map(corner => this.fillMenus(corner));

    return cafeteria;
  }

  private fillMenus(corner: Corner) {
    corner.menus = this.menus
      // @ts-ignore
      .filter(rawMenu => rawMenu['corner-id'] === corner.id)
      .map(rawMenu => plainToClass(Menu, rawMenu, this.transformOptions));

    return corner;
  }

  reduce() {
    return this.cafeteria
      .map(rawCafeteria =>
        plainToClass(Cafeteria, rawCafeteria, this.transformOptions),
      )
      .map(cafeteria => this.fillCorners(cafeteria));
  }
}
