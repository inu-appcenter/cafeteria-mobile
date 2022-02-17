/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import useInterval from '../../../hooks/useInterval';
import BookingItem from './BookingItem';
import handleApiError from '../../../../common/utils/handleApiError';
import NoBookingsView from './NoBookingsView';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingHistory'>;
};

function History({navigation}: Props) {
  const {bookingStore} = useStores();

  const [loading, fetch] = useApi(() => bookingStore.fetchMyBookings());

  const getMyBookings = () => fetch().catch(handleApiError);
  const myBookings = bookingStore.myBookings;

  useEffect(() => {
    // 한번 loading view 포함해서 땡겨놓고,
    getMyBookings();

    // 그 다음 변화부터는 listening 시작.
    bookingStore.listenForMyBookings();

    return () => {
      // Unmount 시점에는 연결 제거.
      bookingStore.stopListeningForMyBookings();
    };
  }, []);

  const emptyView = <NoBookingsView />;

  const content = (
    <FlatList
      data={myBookings}
      renderItem={i => <BookingItem booking={i.item} />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={getMyBookings} />}
      contentContainerStyle={styles.bottomSpaced}
      ListFooterComponent={<Text style={styles.footerText}>최근 3일 동안의 예약 내역이 표시됩니다.</Text>}
    />
  );

  const makeBookingButton = (
    <View style={styles.fabContainer}>
      <FAB
        style={styles.fabNeutral}
        icon="help"
        color={colors.textSecondary}
        onPress={() => bookingStore.showOnboardingOnce()}
      />
      <FAB
        style={styles.fabMain}
        icon="ticket-confirmation"
        label="예약하기"
        color={'white'}
        onPress={() => navigation.navigate('BookingOptionsList')}
      />
    </View>
  );

  return (
    <View style={palette.whiteFullSized}>
      {bookingStore.hasBookings ? content : emptyView}
      {makeBookingButton}
    </View>
  );
}

export default observer(History);

const styles = StyleSheet.create({
  bottomSpaced: {
    paddingBottom: 90,
  },
  footerText: {
    ...palette.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    end: 0,
    margin: 16,

    flex: 1,
    flexDirection: 'row',
  },
  fabNeutral: {
    backgroundColor: colors.neutralGray,
    alignSelf: 'center',
  },
  fabMain: {
    backgroundColor: colors.mainTint,
    marginStart: 12,
    alignSelf: 'center',
  },
});
