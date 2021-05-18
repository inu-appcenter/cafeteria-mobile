import UserStore from '../presentation/features/membership/UserStore';
import CounterStore from '../presentation/features/counter/CounterStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import MembershipStore from '../presentation/features/membership/MembershipStore';

export default class RootStore {
  userStore = new UserStore();
  counterStore = new CounterStore();
  cafeteriaStore = new CafeteriaStore();
  membershipStore = new MembershipStore();
}
