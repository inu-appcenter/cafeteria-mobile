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
import Complete from './Complete';
import {observer} from 'mobx-react';
import Onboarding from './Onboarding';
import MyBookings from './MyBookings';
import useUserState from '../../hooks/useUserState';
import CafeteriaView from '../cafeteria/CafeteriaView';
import GuestLoginScreen from '../login/GuestLoginScreen';
import StudentLoginScreen from '../login/StudentLoginScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';

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

  /**
   * 로그인 유도하는 화면.
   * 전체화면으로 보여줄거라서 헤더는 숨김.
   */
  const onboarding = (
    <Stack.Screen
      key="booking_onboarding"
      name="BookingOnboarding"
      component={Onboarding}
      options={{headerShown: false}}
    />
  );

  /**
   * 학번으로 로그인하는 화면.
   */
  const studentLogin = (
    <Stack.Screen
      key="booking_student_login"
      name="BookingStudentLogin"
      component={StudentLoginScreen}
      options={{title: '재학생 로그인'}}
    />
  );

  /**
   * 휴대전화번호로 로그인하는 화면.
   */
  const guestLogin = (
    <Stack.Screen
      key="booking_guest_login"
      name="BookingGuestLogin"
      component={GuestLoginScreen}
      options={{title: '휴대전화로 로그인'}}
    />
  );

  /**
   * 예약 가능 식당 목록.
   */
  const list = (
    <Stack.Screen
      key="booking_list"
      name="BookingList"
      component={List}
      options={({navigation}) => ({
        title: '식당 예약',
      })}
    />
  );

  /**
   * 식당 내 예약 가능 시간대 목록.
   */
  const detail = (
    <Stack.Screen
      key="booking_detail"
      name="BookingDetail"
      component={Detail}
      options={{
        headerShown: true,
        title: '예약 시간 조회',
      }}
    />
  );

  /**
   * 예약 완료 화면.
   */
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

  /**
   * 내 예약 화면.
   */
  const myBookings = (
    <Stack.Screen
      key="booking_my_bookings"
      name="BookingMyBookings"
      component={MyBookings}
      options={{
        title: '예약 내역',
      }}
    />
  );

  return (
    <Stack.Navigator headerMode="screen" screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      {isLoggedIn ? [myBookings, list, detail, complete] : [onboarding, studentLogin, guestLogin]}
    </Stack.Navigator>
  );
}

export default observer(BookingScreen);
