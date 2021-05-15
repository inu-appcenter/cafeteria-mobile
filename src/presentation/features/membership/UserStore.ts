import {makeAutoObservable} from 'mobx';
import Login from '../../../domain/usecases/Login';

export default class UserStore {
  private _isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  set isLoggedIn(isLoggedIn) {
    this._isLoggedIn = isLoggedIn;
  }

  private _loading: boolean = false;
  get loading() {
    return this._loading;
  }
  set loading(loading) {
    this._loading = loading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async login(id: string, password: string) {
    this.loading = true;

    try {
      await Login.run({id, password});

      this.isLoggedIn = true;
    } catch (e) {
      this.isLoggedIn = false;
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
