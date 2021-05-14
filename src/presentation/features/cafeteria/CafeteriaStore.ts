import Cafeteria from '../../../domain/entities/Cafeteria';
import GetCafeteria from '../../../domain/usecases/GetCafeteria';
import CafeteriaView from './CafeteriaView';
import {makeAutoObservable} from 'mobx';

export default class CafeteriaStore {
  cafeteria: Map<number, CafeteriaView[]> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  fetch(dateOffset: number) {
    GetCafeteria.run({dateOffset}).then(cafeteria => {
      this.updateCafeteriaWithFetchedOnes(dateOffset, cafeteria);
    });
  }

  private updateCafeteriaWithFetchedOnes(
    dateOffset: number,
    fetched: Cafeteria[],
  ) {
    this.cafeteria.set(
      dateOffset,
      fetched.map(c => CafeteriaView.fromCafeteria(c)),
    );
  }
}
