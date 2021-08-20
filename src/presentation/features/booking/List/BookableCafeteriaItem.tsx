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
import {Image, StyleSheet, Text, View} from 'react-native';
import CardView from '../../../components/CardView';
import CafeteriaView from '../../cafeteria/CafeteriaView';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import colors from '../../../res/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChevronRight from '../../../components/ChevronRight';

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
      }}>
      <Text style={{fontSize: 42}}>😋</Text>
      <Text style={[palette.textSubHeader, {marginTop: 12}]}>{cafeteria.displayName}</Text>
      <Text
        style={[
          palette.textSecondary,
          {
            marginTop: 8,
            textAlign: 'center',
            marginHorizontal: 12,
          },
        ]}>
        붐비는 시간대에 편하게 입장할 수 있어요.
      </Text>
      <Button
        mode="contained"
        labelStyle={[palette.textPrimary, {color: colors.white, paddingVertical: 4}]}
        color={colors.mainTint}
        onPress={goToDetails}
        style={{alignSelf: 'stretch', marginTop: 21}}>
        {cafeteria.displayName} 예약하기
      </Button>
    </CardView>
  );
}
