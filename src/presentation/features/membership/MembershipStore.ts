import {makeAutoObservable} from 'mobx';

export default class MembershipStore {
  loggedIn: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  login() {}
}
