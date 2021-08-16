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
import {createStackNavigator} from '@react-navigation/stack';
import StackHeaderPresets from '../../../components/utils/StackHeaderPresets';
import List from './List';
import Detail from './Detail';
import MyBookingsHeaderButton from './List/MyBookingsHeaderButton';
import MyBookings from './MyBookings';

export type BookingMainNavigationParams = {
  BookingMainList: undefined;
  BookingMainDetail: undefined;
  BookingMyList: undefined;
};

export default function Main() {
  const Stack = createStackNavigator<BookingMainNavigationParams>();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name="BookingMainList"
        component={List}
        options={({navigation}) => ({
          title: '식당 예약',
          headerRight: () => <MyBookingsHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen name="BookingMainDetail" component={Detail} />
      <Stack.Screen name="BookingMyList" component={MyBookings} />
    </Stack.Navigator>
  );
}
