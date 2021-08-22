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
import {FlatList, RefreshControl, View} from 'react-native';
import useStores from '../../../hooks/useStores';
import palette from '../../../res/palette';
import {observer} from 'mobx-react';
import handleApiError from '../../../../common/utils/handleApiError';
import useApi from '../../../hooks/useApi';
import BookingItem from './BookingItem';
import {FAB} from 'react-native-paper';
import colors from '../../../res/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import NoBookingsView from './NoBookingsView';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingMyBookings'>;
};

function MyBookings({navigation}: Props) {
  const {bookingStore} = useStores();

  const [loading, fetch] = useApi(() => bookingStore.fetchMyBookings());

  const myBookings = bookingStore.myBookings;
  const getMyBookings = () => fetch().catch(handleApiError);

  useEffect(() => {
    getMyBookings();
  }, []);

  const emptyView = <NoBookingsView />;

  const content = (
    <FlatList
      data={myBookings}
      contentContainerStyle={{paddingBottom: 90}}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getMyBookings} />}
      renderItem={i => <BookingItem booking={i.item} />}
    />
  );

  return (
    <View style={[palette.whiteBackground, palette.fullSized]}>
      {bookingStore.hasBookings ? content : emptyView}
      <FAB
        style={{
          position: 'absolute',
          bottom: 0,
          end: 0,
          margin: 16,
          backgroundColor: colors.mainTint,
        }}
        icon="ticket-confirmation"
        label="예약하기"
        color={'white'}
        onPress={() => navigation.navigate('BookingList')}
      />
    </View>
  );
}

export default observer(MyBookings);
