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
      // 여기서 예외가 잡히면 참 이상한 경우지만 충분히 일어날 수 있는 일입니다(ㅠㅠ).
      // 예외를 위로 전파하지는 말고 로그인만 유도합니다!
      console.log('하하 또 이상한 일이 일어났네요');
      this.isLoggedIn = false;
    }
  }
}
