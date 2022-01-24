/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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

import Ask from './Ask';
import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import History from './History';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

type QnANavigationParams = {
  QnAAsk: undefined;
  QnAHistory: undefined;
};

export default function QnA() {
  const Tab = createMaterialTopTabNavigator<QnANavigationParams>();

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        labelStyle: styles.label,
        indicatorStyle: styles.indicator,
        activeTintColor: colors.textPrimary,
        inactiveTintColor: colors.textDisabled,
      }}>
      <Tab.Screen name="QnAAsk" component={Ask} options={{title: '문의하기'}} />
      <Tab.Screen name="QnAHistory" component={History} options={{title: '지난 문의 내역'}} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    ...palette.shadowedTopBar,
  },
  label: {
    fontSize: 14,
    padding: 0,
  },
  indicator: {
    backgroundColor: colors.textPrimary,
    borderRadius: 1,
  },
});
