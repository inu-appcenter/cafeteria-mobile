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

import List from './List';
import React from 'react';
import Detail from './Detail';
import {observer} from 'mobx-react';
import Onboarding from './Onboarding';
import MyBookings from './MyBookings';
import useUserState from '../../hooks/useUserState';
import GuestLoginScreen from '../login/GuestLoginScreen';
import StudentLoginScreen from '../login/StudentLoginScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';
import MyBookingsHeaderButton from './List/MyBookingsHeaderButton';
import Complete from './Complete';
import CafeteriaView from '../cafeteria/CafeteriaView';

export type BookingNavigationParams = {
  BookingOnboarding: undefined;
  BookingStudentLogin: undefined;
  BookingGuestLogin: undefined;

  BookingList: undefined;
  BookingDetail: {cafeteria: CafeteriaView};
  BookingComplete: undefined;
  BookingMyBookings: undefined;
};

function BookingScreen() {
  const {isLoggedIn} = useUserState();

  const Stack = createStackNavigator<BookingNavigationParams>();

  const onboarding = (
    <Stack.Screen
      key="booking_onboarding"
      name="BookingOnboarding"
      component={Onboarding}
      options={{headerShown: false}}
    />
  );

  const studentLogin = (
    <Stack.Screen
      key="booking_student_login"
      name="BookingStudentLogin"
      component={StudentLoginScreen}
      options={{title: '재학생 로그인'}}
    />
  );

  const guestLogin = (
    <Stack.Screen
      key="booking_guest_login"
      name="BookingGuestLogin"
      component={GuestLoginScreen}
      options={{title: '휴대전화로 로그인'}}
    />
  );

  const list = (
    <Stack.Screen
      key="booking_list"
      name="BookingList"
      component={List}
      options={({navigation}) => ({
        title: '식당 예약',
        headerRight: () => <MyBookingsHeaderButton navigation={navigation} />,
      })}
    />
  );

  const detail = <Stack.Screen key="booking_detail" name="BookingDetail" component={Detail} />;

  const complete = (
    <Stack.Screen
      key="booking_complete"
      name="BookingComplete"
      component={Complete}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );

  const myBookings = (
    <Stack.Screen
      key="booking_my_bookings"
      name="BookingMyBookings"
      component={MyBookings}
      options={{
        title: '예약 목록',
      }}
    />
  );

  return (
    <Stack.Navigator headerMode="screen" screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      {isLoggedIn ? [list, detail, complete, myBookings] : [onboarding, studentLogin, guestLogin]}
    </Stack.Navigator>
  );
}

export default observer(BookingScreen);
