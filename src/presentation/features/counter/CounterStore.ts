import {makeAutoObservable} from 'mobx';

export default class CounterStore {
  public counterValue = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.counterValue += 1;
  }

  decrease() {
    this.counterValue -= 1;
  }

  set(amount: number) {
    this.counterValue = amount;
  }
}
