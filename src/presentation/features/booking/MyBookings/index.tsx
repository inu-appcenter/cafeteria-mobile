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
import {FlatList, Text} from 'react-native';
import useStores from '../../../hooks/useStores';
import palette from '../../../res/palette';
import {observer} from 'mobx-react';
import handleApiError from '../../../../common/utils/handleApiError';
import LoadingView from '../../../components/LoadingView';
import useApi, {useApiInContainer} from '../../../hooks/useApi';
import {cancelBookingAlert} from '../../../components/utils/alert';
import toast from '../../../components/utils/toast';

function MyBookings() {
  const {bookingStore} = useStores();

  const [Container, data, fetch] = useApiInContainer(bookingStore.myBookings, () =>
    bookingStore.fetchMyBookings(),
  );

  useEffect(() => {
    fetch().catch(handleApiError);
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        style={palette.whiteBackground}
        renderItem={i => (
          <Text
            onLongPress={() =>
              cancelBookingAlert('예약 취소', '예약을 취소할까요?', () =>
                bookingStore.cancelBooking(i.item.id).catch(handleApiError),
              )
            }>
            {i.item.timeSlotTimeString}({i.item.cafeteriaTitle})
          </Text>
        )}
      />
    </Container>
  );
}

export default observer(MyBookings);
