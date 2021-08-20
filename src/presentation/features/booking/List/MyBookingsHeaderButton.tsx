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

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import palette from '../../../res/palette';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import {Badge} from 'react-native-paper';
import {View} from 'react-native';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import Touchable from '../../../components/Touchable';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingMyBookings'>;
};

function MyBookingsHeaderButton({navigation}: Props) {
  const {bookingStore} = useStores();

  const badge = (
    <Badge style={{backgroundColor: 'red', position: 'absolute', top: 8, end: 30, fontSize: 12}}>
      {bookingStore.myBookings?.length}
    </Badge>
  );

  return (
    <Touchable
      onPress={() => {
        navigation.navigate('BookingMyBookings');
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon name="confirmation-number" size={24} style={{paddingHorizontal: 18}} />
        {bookingStore.hasBookings && badge}
      </View>
    </Touchable>
  );
}

export default observer(MyBookingsHeaderButton);
