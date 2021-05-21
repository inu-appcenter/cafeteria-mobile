import Cafeteria from '../../../domain/entities/Cafeteria';
import GetCafeteria from '../../../domain/usecases/GetCafeteria';
import CafeteriaView from './CafeteriaView';
import GetListOrders from '../../../domain/usecases/GetListOrders';
import SaveListOrders from '../../../domain/usecases/SaveListOrders';
import GetOrderApplier from '../../../domain/usecases/GetOrderApplier';
import GetCafeteriaOnly from '../../../domain/usecases/GetCafeteriaOnly';
import {makeAutoObservable} from 'mobx';
import CafeteriaWithMenuView from './CafeteriaWithMenuView';

export default class CafeteriaStore {
  private _cafeteriaWithMenus: Map<number, CafeteriaWithMenuView[]> = new Map();
  getCafeteriaWithMenus(dateOffset: number): CafeteriaWithMenuView[] {
    return this.orderApplier(this._cafeteriaWithMenus.get(dateOffset));
  }

  private _cafeteria: CafeteriaView[] = [];
  get cafeteria() {
    return this.orderApplier(this._cafeteria);
  }
  set cafeteria(value) {
    this._cafeteria = value;
  }

  private _orderedIds: number[] = [];
  private get orderedIds() {
    return this._orderedIds;
  }
  private set orderedIds(value) {
    this._orderedIds = value;
  }

  private get orderApplier() {
    return GetOrderApplier.run(this.orderedIds);
  }

  constructor() {
    makeAutoObservable(this);

    this.loadOrders();
  }

  private async loadOrders() {
    this.orderedIds = await GetListOrders.run();
  }

  async setOrders(orderedIds: number[]) {
    this.orderedIds = orderedIds;

    await SaveListOrders.run(orderedIds);
  }

  async fetchCafeteria() {
    this.cafeteria = await GetCafeteriaOnly.run();
  }

  async fetchCafeteriaWithMenusPerDay(dateOffset: number) {
    const cafeteria = await GetCafeteria.run({dateOffset});

    this.updateCafeteriaWithMenus(dateOffset, cafeteria);
  }

  private updateCafeteriaWithMenus(dateOffset: number, fetched: Cafeteria[]) {
    this._cafeteriaWithMenus.set(
      dateOffset,
      fetched.map(c => CafeteriaWithMenuView.fromCafeteria(c)),
    );
  }
}
