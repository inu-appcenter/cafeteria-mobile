/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {View} from 'react-native';
import EmptyView from '../components/EmptyView';
import {observer} from 'mobx-react';
import LoadingView from '../components/LoadingView';
import React, {useState} from 'react';

/**
 * 스테이트-풀 한 로직 재활용해 봅시다!!!!!!!!!!!!
 * @param apiCall
 */
export default function useApi(apiCall: () => void): [boolean, () => Promise<void>] {
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

/**
 * 화면마다 반복되는 LoadingView, EmptyView 를 위한 로직을 모아놓았습니다.
 * 주의: RefreshControl 과 궁합이 안좋음..
 *
 * @param data Empty 의 기준이 되는 데이터.
 * @param apiCall 데이터를 끌어오는 API 호출 함수.
 */
export function useApiInContainer<ItemT, T extends ItemT[] | undefined>(
  data: T,
  apiCall: () => void,
): [React.ComponentType, T, () => Promise<void>, boolean] {
  const [loading, fetch] = useApi(apiCall);
  const empty = data == null || data.length === 0;

  const LoadingEmptyContainer: React.FunctionComponent = observer(({children}) => {
    const childrenWrapped = <View style={{flex: 1}}>{children}</View>;
    const loadingView = <LoadingView />;
    const emptyView = <EmptyView />;

    return loading ? loadingView : empty ? emptyView : childrenWrapped;
  });

  return [LoadingEmptyContainer, data, fetch, loading];
}
