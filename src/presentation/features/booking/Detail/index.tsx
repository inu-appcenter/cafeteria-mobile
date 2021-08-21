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

import palette from '../../../res/palette';
import {RouteProp} from '@react-navigation/native';
import {RefreshControl, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import useStores from '../../../hooks/useStores';
import ConfirmModal from './ConfirmModal';
import useApi from '../../../hooks/useApi';
import handleApiError from '../../../../common/utils/handleApiError';
import {observer} from 'mobx-react';
import BookingOptionItem from './BookingOptionItem';
import {SectionGrid} from 'react-native-super-grid';
import BookingOptionView from '../BookingOptionView';
import colors from '../../../res/colors';
import SpinningRefreshButton from '../../../components/SpinningRefreshButton';

type Props = {
  route: RouteProp<BookingNavigationParams, 'BookingDetail'>;
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingDetail'>;
};

function Detail({route, navigation}: Props) {
  const {cafeteria} = route.params;
  const {bookingStore} = useStores();

  const data = bookingStore.getBookingOptions(cafeteria.id);

  const [refreshing, refresh] = useApi(async () => bookingStore.fetchBookingOptions(cafeteria));

  const refreshOptions = async () => {
    refresh().catch(handleApiError);
  };

  useEffect(() => {
    bookingStore.dismissCurrentOption();
    refreshOptions();
  }, []);

  return (
    <View style={[palette.whiteBackground, palette.fullSized]}>
      <View
        style={{
          padding: 16,
          backgroundColor: colors.grayishWhite,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={palette.textSubHeader}>😋 {cafeteria.displayName}</Text>
          <Text style={{...palette.textPrimary, marginTop: 8}}>{data[0]?.timeSlotDateString}</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <SpinningRefreshButton onPress={refreshOptions} />
        </View>
      </View>
      <SectionGrid
        style={palette.whiteBackground}
        sections={splitItemsIntoSections(data)}
        itemDimension={200}
        spacing={8}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshOptions} />}
        renderItem={i => <BookingOptionItem bookingOption={i.item} />}
        renderSectionHeader={({section}) => (
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: 16,
              fontWeight: 'bold',
              backgroundColor: colors.sectionHeaderBackground,
              paddingHorizontal: 16,
              paddingVertical: 5,
            }}>
            {section.title}
          </Text>
        )}
      />
      <ConfirmModal navigation={navigation} />
    </View>
  );
}

export default observer(Detail);

function splitItemsIntoSections(options: BookingOptionView[]) {
  return [...new Set(options.map(o => new Date(o.timeSlotTimestamp).getHours()))]
    .sort((l, r) => l - r)
    .map(hour => ({
      title: `${hour}시`,
      data: options.filter(o => new Date(o.timeSlotTimestamp).getHours() === hour),
    }));
}
