import {makeAutoObservable} from 'mobx';

export default class LoginStore {
  idField: string = '';
  passwordField: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setIdField(value: string) {
    this.idField = value;
  }

  setPasswordField(value: string) {
    this.passwordField = value;
  }
}
