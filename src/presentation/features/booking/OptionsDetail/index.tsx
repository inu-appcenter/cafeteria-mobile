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

import colors from '../../../res/colors';
import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import {RouteProp} from '@react-navigation/native';
import ConfirmModal from './ConfirmModal';
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

  const groupedOptions = bookingStore.getGroupedBookingOptions(cafeteria.id);
  const isEmpty = groupedOptions?.isEmpty ?? false;

  const [refreshing, refresh] = useApi(async () => bookingStore.fetchBookingOptions(cafeteria));

  const refreshOptions = async () => {
    refresh().catch(handleApiError);
  };

  useEffect(() => {
    bookingStore.dismissCurrentOption();
    refreshOptions();
  }, []);

  const content = (
    <SectionList
      style={styles.list}
      sections={splitItemsIntoSections(groupedOptions?.options || [])}
      renderItem={i => <BookingOptionItem bookingOption={i.item} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshOptions} />}
      initialNumToRender={groupedOptions?.options.length}
      renderSectionHeader={SectionHeader}
    />
  );

  const emptyView = (
    <View style={styles.emptyView}>
      <Text style={styles.helpText}>예약 가능한 옵션이 없습니다.</Text>
      <Text style={styles.helpTextSmall}>
        식당 운영일 전날 예약 마감 시간 이후에{'\n'}예약 옵션이 표시됩니다.
      </Text>
    </View>
  );

  return (
    <View style={palette.whiteFullSized}>
      <View style={styles.headerPlate}>
        <View>
          <Text style={palette.textSubHeader}>{cafeteria.displayName}</Text>
          <Text style={styles.headerDateText}>{groupedOptions?.timeSlotDateString}</Text>
        </View>
        <View style={styles.spinnerContainer}>
          <SpinningRefreshButton onPress={refreshOptions} />
        </View>
      </View>
      {isEmpty ? emptyView : content}
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
    color: colors.lightBlueText,
    marginTop: 8,
  },
  spinnerContainer: {
    justifyContent: 'center',
  },
  list: {
    ...palette.whiteBackground,
    flex: 0, // https://github.com/facebook/react-native/issues/15990#issuecomment-456974250
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    ...palette.textTertiary,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  helpTextSmall: {
    ...palette.textTertiary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginHorizontal: 16,
  },
});
