import {makeAutoObservable} from 'mobx';

export default class GlobalStore {
  loggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
}
