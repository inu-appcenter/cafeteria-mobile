import {makeAutoObservable, runInAction} from 'mobx';
import cafeteriaRepository from '../../../data/repositories/CafeteriaRepository';
import CafeteriaView from './CafeteriaView';

export default class CafeteriaStore {
  cafeteria: Map<number, CafeteriaView[]> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  fetch(dateOffset: number) {
    cafeteriaRepository.getCafeteria(dateOffset).then(cafeteria => {
      runInAction(() => {
        this.cafeteria.set(
          dateOffset,
          cafeteria.map(c => CafeteriaView.fromCafeteria(c)),
        );
      });
    });
  }
}
