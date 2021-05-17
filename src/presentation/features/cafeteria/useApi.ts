import {useState} from 'react';

/**
 * 스테이트-풀 한 로직 재활용해 봅시다!!!!!!!!!!!!
 * @param apiCall
 */
export default function useApi(
  apiCall: () => void,
): [boolean, () => Promise<void>] {
  const [loading, setLoading] = useState(false);

  const invoke = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      await apiCall();
    } finally {
      setLoading(false);
    }
  };

  return [loading, invoke];
}
