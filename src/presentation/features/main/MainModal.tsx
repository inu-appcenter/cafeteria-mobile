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
import useStores from '../../hooks/useStores';
import {observe} from 'mobx';
import {observer} from 'mobx-react';
import BottomNavigator from './BottomNavigator';
import AgreementScreen from '../privacy/AgreementScreen';
import {navigateGlobal} from '../../global/GlobalNavigation';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * 최상단에서 전체화면 모달을 띄우기 위해 사용합니다.
 */
function MainModal() {
  const RootStack = createStackNavigator();
  const {userStore} = useStores();

  /**
   * 이 부분은 그냥 조건부 렌더링으로 했다가는 네비게이션이 어색해져서
   * 이렇게 수동으로 처리했습니다.
   */
  observe(userStore, changes => {
    if (changes.name !== '_isAgreementRequired') {
      return;
    }

    if (changes.type !== 'update') {
      return;
    }

    if (changes.newValue) {
      navigateGlobal('PrivacyPolicyAgreement');
    } else {
      navigateGlobal('MainBottomNavigation');
    }
  });

  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="MainBottomNavigation"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="PrivacyPolicyAgreement"
        component={AgreementScreen}
        options={{title: '개인정보 수집 및 제공 동의', headerLeft: () => null, gestureEnabled: false}}
      />
    </RootStack.Navigator>
  );
}

export default observer(MainModal);
