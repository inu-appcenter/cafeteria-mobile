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
import {FlatList, Text} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';

type Props = {
  route: RouteProp<BookingNavigationParams, 'BookingDetail'>;
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingDetail'>;
};

export default function Detail({route, navigation}: Props) {
  const {cafeteria} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: cafeteria.title});
  });

  return (
    <FlatList
      data={cafeteria.options}
      style={palette.whiteBackground}
      renderItem={i => (
        <Text>
          {i.item.timeSlotDisplayString}({i.item.used}/{i.item.capacity})
        </Text>
      )}
    />
  );
}
