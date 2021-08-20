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

import React, {useEffect} from 'react';
import {FlatList, RefreshControl, Text} from 'react-native';
import useStores from '../../../hooks/useStores';
import palette from '../../../res/palette';
import {observer} from 'mobx-react';
import handleApiError from '../../../../common/utils/handleApiError';
import LoadingView from '../../../components/LoadingView';
import useApi, {useApiInContainer} from '../../../hooks/useApi';
import {cancelBookingAlert} from '../../../components/utils/alert';
import toast from '../../../components/utils/toast';
import BookingItem from './BookingItem';
import EmptyView from '../../../components/EmptyView';

function MyBookings() {
  const {bookingStore} = useStores();

  const [loading, fetch] = useApi(() => bookingStore.fetchMyBookings());

  const myBookings = bookingStore.myBookings;
  const getMyBookings = () => fetch().catch(handleApiError);

  const emptyView = <EmptyView />;

  const content = (
    <FlatList
      data={myBookings}
      style={palette.whiteBackground}
      contentContainerStyle={{paddingBottom: 25}}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getMyBookings} />}
      renderItem={i => <BookingItem booking={i.item} />}
    />
  );

  return bookingStore.hasBookings ? content : emptyView;
}

export default observer(MyBookings);
