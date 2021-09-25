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

import {FAB} from 'react-native-paper';
import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import {observer} from 'mobx-react';
import useStores from '../../../hooks/useStores';
import BookingItem from './BookingItem';
import handleApiError from '../../../../common/utils/handleApiError';
import NoBookingsView from './NoBookingsView';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingHistory'>;
};

function History({navigation}: Props) {
  const {bookingStore} = useStores();

  const [loading, fetch] = useApi(() => bookingStore.fetchMyBookings());
  const [_, refresh] = useApi(() => bookingStore.fetchMyBookings());

  const myBookings = bookingStore.myBookings;
  const getMyBookings = () => fetch().catch(handleApiError);
  const silentRefresh = () => refresh().catch();

  const timer = () => {
    setTimeout(() => {
      silentRefresh();

      timer();
    }, 1000);
  };

  useEffect(() => {
    getMyBookings();
    timer();
  }, []);

  const emptyView = <NoBookingsView />;

  const content = (
    <FlatList
      data={myBookings}
      renderItem={i => <BookingItem booking={i.item} />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getMyBookings} />}
      contentContainerStyle={style.bottomSpaced}
    />
  );

  const makeBookingButton = (
    <FAB
      style={palette.floatingActionButton}
      icon="ticket-confirmation"
      label="예약하기"
      color={'white'}
      onPress={() => navigation.navigate('BookingOptionsList')}
    />
  );

  return (
    <View style={palette.whiteFullSized}>
      {bookingStore.hasBookings ? content : emptyView}
      {makeBookingButton}
    </View>
  );
}

export default observer(History);

const style = StyleSheet.create({
  bottomSpaced: {
    paddingBottom: 90,
  },
});
