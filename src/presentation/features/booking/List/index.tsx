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

import useStores from '../../../hooks/useStores';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react';
import palette from '../../../res/palette';
import CafeteriaItem from './CafeteriaItem';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {BookingNavigationParams} from '../BookingScreen';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingList'>;
};

function List({navigation}: Props) {
  const {cafeteriaStore} = useStores();

  return (
    <FlatList
      data={cafeteriaStore.cafeteria}
      style={palette.whiteBackground}
      renderItem={i => <CafeteriaItem navigation={navigation} cafeteria={i.item} />}
    />
  );
}

export default observer(List);
