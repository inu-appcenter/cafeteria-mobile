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

  private initializationStarted = false;

  startInitialization() {
    if (this.initializationStarted) {
      return;
    }

    this.userStore
      .rememberedLogin()
      .catch(e =>
        console.log(`저장된 사용자 정보로 로그인하는 데에 실패했습니다: ${e}`),
      );

    setTimeout(
      () =>
        this.noticeStore
          .fetchNewNotice()
          .catch(e =>
            console.log(`새 공지를 가져오는 데에 실패했습니다: ${e}`),
          ),
      500,
    );

    this.initializationStarted = true;
  }
}
