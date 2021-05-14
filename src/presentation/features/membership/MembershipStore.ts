import {makeAutoObservable} from 'mobx';

export default class MembershipStore {
  loggedIn: boolean = false;

  idField: string = '';
  passwordField: string = '';

  barcode: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setIdField(value: string) {
    this.idField = value;
  }

  setPasswordField(value: string) {
    this.passwordField = value;
  }

  login() {}
}
