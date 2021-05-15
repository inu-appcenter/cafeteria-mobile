import {action, computed, makeObservable, observable} from 'mobx';

export default class MembershipStore {
  idField: string = '';
  passwordField: string = '';

  barcode: string = '';

  constructor() {
    makeObservable(this, {
      idField: observable,
      passwordField: observable,
      setIdField: action,
      setPasswordField: action,
      isFormValid: computed,
      login: action,
    });
  }

  setIdField(value: string) {
    this.idField = value;
  }

  setPasswordField(value: string) {
    this.passwordField = value;
  }

  get isFormValid() {
    return this.idField.length > 0 && this.passwordField.length > 0;
  }

  login() {}
}
