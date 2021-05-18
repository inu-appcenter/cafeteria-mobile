import notify from '../../presentation/components/utils/notify';
import ApiError from '../../data/exceptions/ApiError';
import Unauthorized from '../../data/exceptions/Unauthorized';
import InternalError from '../../data/exceptions/InternalError';
import CannotReachServer from '../../data/exceptions/CannotReachServer';
import UnhandledHttpError from '../../data/exceptions/UnhandledHttpError';

export default function handleApiError(e: Error) {
  if (!(e instanceof ApiError)) {
    notify(`😱 예상치 못한 오류입니다! ${e}`);
    return;
  }

  if (e instanceof CannotReachServer) {
    notify('🥺 서버에 연결할 수 없습니다. 인터넷 상태를 확인해 주세요!');
  } else if (e instanceof Unauthorized) {
    notify('😨 인증되지 않은 요청입니다.');
  } else if (e instanceof InternalError) {
    notify('🤯 서버 내부에서 문제가 생겼습니다.');
  } else if (e instanceof UnhandledHttpError) {
    notify(`🧐 응답 코드 ${e.statusCode}입니다.`);
  } else {
    notify(`😔 미처 처리하지 못한 오류입니다! ${e}`);
  }
}
