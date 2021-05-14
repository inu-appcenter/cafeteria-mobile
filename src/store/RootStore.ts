import CounterStore from '../presentation/features/counter/CounterStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import MembershipStore from '../presentation/features/membership/MembershipStore';
import LoginStore from '../presentation/features/membership/LoginStore';
import GlobalStore from './GlobalStore';

export default class RootStore {
  globalStore = new GlobalStore();
  counterStore = new CounterStore();
  cafeteriaStore = new CafeteriaStore();
  membershipStore = new MembershipStore();
  loginStore = new LoginStore();
}
