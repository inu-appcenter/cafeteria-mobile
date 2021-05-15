import CounterStore from '../presentation/features/counter/CounterStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import MembershipStore from '../presentation/features/membership/MembershipStore';
import UserStore from '../presentation/features/membership/UserStore';

export default class RootStore {
  counterStore = new CounterStore();
  cafeteriaStore = new CafeteriaStore();
  membershipStore = new MembershipStore();
  userStore = new UserStore();
}
