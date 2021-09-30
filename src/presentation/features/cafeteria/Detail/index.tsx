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

import Pager from '../List/Section/Pager';
import React, {useEffect} from 'react';
import palette from '../../../res/palette';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {CafeteriaListDetailNavigationParams} from '../CafeteriaScreen';

type Props = {
  route: RouteProp<CafeteriaListDetailNavigationParams, 'CafeteriaDetail'>;
  navigation: StackNavigationProp<CafeteriaListDetailNavigationParams, 'CafeteriaDetail'>;
};

export default function Detail({route, navigation}: Props) {
  const {cafeteria} = route.params;

  useEffect(() => {
    navigation.setOptions({headerTitle: cafeteria.title});
  });

  return (
    <ScrollView style={palette.whiteBackground} contentContainerStyle={styles.detailContentContainer}>
      <Pager menus={cafeteria.menus} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContentContainer: {
    paddingTop: 8,
  },
});
