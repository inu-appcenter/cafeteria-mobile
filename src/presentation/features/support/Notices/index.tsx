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

import useApi, {useApiInContainer} from '../../../hooks/useApi';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {FlatList} from 'react-native';
import NoticeItem from './NoticeItem';
import ItemSeparator from '../../../components/ItemSeparator';
import handleApiError from '../../../../common/utils/handleApiError';
import React, {useEffect} from 'react';
import LoadingView from '../../../components/LoadingView';

export default function Notices() {
  const {noticeStore} = useStores();

  const [Container, data, fetch] = useApiInContainer(noticeStore.notices, () =>
    noticeStore.fetchAllNotices(),
  );

  useEffect(() => {
    fetch().catch(handleApiError);
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        style={palette.whiteBackground}
        renderItem={i => <NoticeItem notice={i.item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
}
