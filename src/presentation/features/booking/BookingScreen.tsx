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
import History from './History';
import Complete from './Complete';
import NeedLogin from './NeedLogin';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import Onboarding from './Onboarding';
import OptionsList from './OptionsList';
import useUserState from '../../hooks/useUserState';
import OptionsDetail from './OptionsDetail';
import CafeteriaView from '../cafeteria/CafeteriaView';
import GuestLoginScreen from '../login/GuestLoginScreen';
import StudentLoginScreen from '../login/StudentLoginScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import {createStackNavigator} from '@react-navigation/stack';
import BookingInfoHeaderButton from './History/BookingInfoHeaderButton';
import BookingOptionInfoHeaderButton from './OptionsDetail/BookingOptionInfoHeaderButton';

export type BookingNavigationParams = {
  BookingOnboarding: undefined;
  BookingNeedLogin: undefined;
  BookingStudentLogin: undefined;
  BookingGuestLogin: undefined;

  BookingHistory: undefined;
  BookingOptionsList: undefined;
  BookingOptionsDetail: {cafeteria: CafeteriaView};
  BookingComplete: undefined;
};

function BookingScreen() {
  const {isLoggedIn} = useUserState();
  const {bookingStore} = useStores();

  const Stack = createStackNavigator<BookingNavigationParams>();

  /**
   * 초기 안내(온보딩) 화면.
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
   * 로그인 유도하는 화면.
   * 전체화면으로 보여줄거라서 헤더는 숨김.
   */
  const needLogin = (
    <Stack.Screen
      key="booking_need_login"
      name="BookingNeedLogin"
      component={NeedLogin}
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
      options={{title: '전화번호로 로그인'}}
    />
  );

  /**
   * 예약 내역 화면.
   */
  const history = (
    <Stack.Screen
      key="booking_my_bookings"
      name="BookingHistory"
      component={History}
      options={{
        title: '예약 내역',
        headerRight: () => <BookingInfoHeaderButton />,
      }}
    />
  );

  /**
   * 예약 가능 식당 목록.
   */
  const list = (
    <Stack.Screen
      key="booking_options_list"
      name="BookingOptionsList"
      component={OptionsList}
      options={{
        title: '식당 선택',
      }}
    />
  );

  /**
   * 식당 내 예약 가능 시간대 목록.
   */
  const detail = (
    <Stack.Screen
      key="booking_options_detail"
      name="BookingOptionsDetail"
      component={OptionsDetail}
      options={{
        title: '시간 선택',
        headerRight: () => <BookingOptionInfoHeaderButton />,
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

  const beforeOnboarding = [onboarding];
  const afterOnboarding = isLoggedIn
    ? [history, list, detail, complete]
    : [needLogin, studentLogin, guestLogin];

  return (
    <Stack.Navigator headerMode="screen" screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      {bookingStore.onboardingHasShown ? afterOnboarding : beforeOnboarding}
    </Stack.Navigator>
  );
}

export default observer(BookingScreen);
