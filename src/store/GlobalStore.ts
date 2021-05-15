import {makeAutoObservable} from 'mobx';

export default class GlobalStore {
  isLoggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }
}
