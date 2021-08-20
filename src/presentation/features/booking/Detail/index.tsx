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
import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import useStores from '../../../hooks/useStores';
import ConfirmModal from './ConfirmModal';
import {useApiInContainer} from '../../../hooks/useApi';
import handleApiError from '../../../../common/utils/handleApiError';
import {observer} from 'mobx-react';
import BookingOptionItem from './BookingOptionItem';
import {SectionGrid} from 'react-native-super-grid';
import BookingOptionView from '../BookingOptionView';

type Props = {
  route: RouteProp<BookingNavigationParams, 'BookingDetail'>;
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingDetail'>;
};

function Detail({route, navigation}: Props) {
  const {cafeteria} = route.params;
  const {bookingStore} = useStores();

  const [Container, data, fetch] = useApiInContainer(bookingStore.getBookingOptions(cafeteria.id), () =>
    bookingStore.fetchBookingOptions(cafeteria),
  );

  useEffect(() => {
    bookingStore.dismissCurrentOption();
    navigation.setOptions({headerTitle: cafeteria.displayName});
    fetch().catch(handleApiError);
  }, []);

  const optionsList = (
    <SectionGrid
      sections={splitItemsIntoSections(data)}
      style={palette.whiteBackground}
      renderItem={i => <BookingOptionItem bookingOption={i.item} />}
      renderSectionHeader={({section}) => <Text style={{fontSize: 20}}>{section.title}</Text>}
    />
  );

  return (
    <Container>
      <View style={{flex: 1}}>
        {optionsList}
        <ConfirmModal navigation={navigation} />
      </View>
    </Container>
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
