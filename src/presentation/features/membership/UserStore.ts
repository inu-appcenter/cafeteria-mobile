import {makeAutoObservable} from 'mobx';
import Login from '../../../domain/usecases/Login';
import GetUser from '../../../domain/usecases/GetUser';

export default class UserStore {
  private _isLoggedIn: boolean = false;
  get isLoggedIn() {
    return this._isLoggedIn;
  }
  set isLoggedIn(isLoggedIn) {
    this._isLoggedIn = isLoggedIn;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async login(id: string, password: string) {
    try {
      await Login.run({id, password});

      this.isLoggedIn = true;
    } catch (e) {
      this.isLoggedIn = false;
      throw e;
    }
  }

  async tryRememberedLogin() {
    const savedUserInfo = await GetUser.run();
    if (savedUserInfo === undefined) {
      return;
    }

    try {
      // 여기까지 왔다는건 학번과 토큰이 저장되어 있다는 것!
      console.log(`학번이 ${savedUserInfo.id} 이신 분 자동로그인 하십니다.`);
      await Login.run();

      this.isLoggedIn = true;
    } catch (e) {
      this.isLoggedIn = false;
      throw e;
    }
  }
}
