import UserStore from '../presentation/features/membership/UserStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import MembershipStore from '../presentation/features/membership/MembershipStore';

export default class RootStore {
  userStore = new UserStore();
  cafeteriaStore = new CafeteriaStore();
  membershipStore = new MembershipStore();
}
