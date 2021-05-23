import UserStore from '../presentation/features/membership/UserStore';
import NoticeStore from '../presentation/features/support/Notices/NoticeStore';
import CafeteriaStore from '../presentation/features/cafeteria/CafeteriaStore';
import MembershipStore from '../presentation/features/membership/MembershipStore';
import DirectInquiryStore from '../presentation/features/support/DirectInquery/DirectInquiryStore';

export default class RootStore {
  userStore = new UserStore();
  noticeStore = new NoticeStore();
  cafeteriaStore = new CafeteriaStore();
  membershipStore = new MembershipStore();
  directInquiryStore = new DirectInquiryStore();

  async init() {
    await Promise.all([
      this.userStore.tryRememberedLoginSilentlyIfAvailable(),
      this.noticeStore.fetch(),
    ]);
  }
}
