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

import colors from '../../../res/colors';
import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import {RouteProp} from '@react-navigation/native';
import ConfirmModal from './ConfirmModal';
import {SectionGrid} from 'react-native-super-grid';
import SectionHeader from './SectionHeader';
import handleApiError from '../../../../common/utils/handleApiError';
import BookingOptionView from '../BookingOptionView';
import BookingOptionItem from './BookingOptionItem';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import SpinningRefreshButton from '../../../components/SpinningRefreshButton';
import {BookingNavigationParams} from '../BookingScreen';
import {RefreshControl, SectionList, StyleSheet, Text, View} from 'react-native';

type Props = {
  route: RouteProp<BookingNavigationParams, 'BookingOptionsDetail'>;
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingOptionsDetail'>;
};

function OptionsDetail({route, navigation}: Props) {
  const {cafeteria} = route.params;
  const {bookingStore} = useStores();

  const data = bookingStore.getBookingOptions(cafeteria.id);
  const dateString = data[0]?.timeSlotDateString;

  const [refreshing, refresh] = useApi(async () => bookingStore.fetchBookingOptions(cafeteria));

  const refreshOptions = async () => {
    refresh().catch(handleApiError);
  };

  useEffect(() => {
    bookingStore.dismissCurrentOption();
    refreshOptions();
  }, []);

  return (
    <View style={palette.whiteFullSized}>
      <View style={styles.headerPlate}>
        <View>
          <Text style={palette.textSubHeader}>😋 {cafeteria.displayName}</Text>
          <Text style={styles.headerDateText}>{dateString}</Text>
        </View>
        <View style={styles.spinnerContainer}>
          <SpinningRefreshButton onPress={refreshOptions} />
        </View>
      </View>
      <SectionList
        style={styles.list}
        sections={splitItemsIntoSections(data)}
        renderItem={i => <BookingOptionItem bookingOption={i.item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshOptions} />}
        initialNumToRender={data.length}
        renderSectionHeader={SectionHeader}
      />
      <ConfirmModal navigation={navigation} />
    </View>
  );
}

export default observer(OptionsDetail);

/**
 * 예약 옵션을 시간(hour)별로 섹션화합니다.
 */
function splitItemsIntoSections(options: BookingOptionView[]) {
  return [...new Set(options.map(o => new Date(o.timeSlotTimestamp).getHours()))]
    .sort((l, r) => l - r)
    .map(hour => ({
      title: `${hour}시`,
      data: options.filter(o => new Date(o.timeSlotTimestamp).getHours() === hour),
    }));
}

const styles = StyleSheet.create({
  headerPlate: {
    padding: 16,
    backgroundColor: colors.grayishWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDateText: {
    ...palette.textPrimary,
    marginTop: 8,
  },
  spinnerContainer: {
    justifyContent: 'center',
  },
  list: {
    ...palette.whiteBackground,
    flex: 0, // https://github.com/facebook/react-native/issues/15990#issuecomment-456974250
  },
});
