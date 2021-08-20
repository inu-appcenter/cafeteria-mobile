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

import React from 'react';
import {Text} from 'react-native';
import CardView from '../../../components/CardView';
import CafeteriaView from '../../cafeteria/CafeteriaView';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import palette from '../../../res/palette';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingList'>;
  cafeteria: CafeteriaView;
};

export default function BookableCafeteriaItem({navigation, cafeteria}: Props) {
  const goToDetails = () => navigation.navigate('BookingDetail', {cafeteria});

  return (
    <CardView
      style={{
        marginHorizontal: 16,
        marginTop: 21,
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onPress={goToDetails}>
      <Text style={palette.textSubHeader}>{cafeteria.displayName}</Text>
    </CardView>
  );
}
