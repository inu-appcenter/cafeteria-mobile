import {useState} from 'react';

/**
 * 스테이트-풀 한 로직 재활용해 봅시다!!!!!!!!!!!!
 * @param networkAction
 */
export default function useApi(
  networkAction: () => void,
): [boolean, () => Promise<void>] {
  const [loading, setLoading] = useState(false);

  const invoke = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      await networkAction();
    } finally {
      setLoading(false);
    }
  };

  return [loading, invoke];
}
