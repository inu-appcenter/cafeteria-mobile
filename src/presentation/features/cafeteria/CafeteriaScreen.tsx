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
import Reorder from './Reorder';
import HeaderLogo from './List/HeaderLogo';
import {StyleSheet} from 'react-native';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import ReorderHeaderButton from './List/ReorderHeaderButton';
import CafeteriaWithMenuView from './CafeteriaWithMenuView';
import {createStackNavigator} from '@react-navigation/stack';

export type CafeteriaListDetailNavigationParams = {
  CafeteriaList: undefined;
  CafeteriaDetail: {cafeteria: CafeteriaWithMenuView};
  CafeteriaReorder: undefined;
};

export default function CafeteriaScreen() {
  const Stack = createStackNavigator<CafeteriaListDetailNavigationParams>();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name="CafeteriaList"
        component={List}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: styles.noSeparator,
          headerTitleAlign: 'center',
          headerRight: () => <ReorderHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen name="CafeteriaDetail" component={Detail} />
      <Stack.Screen
        name="CafeteriaReorder"
        component={Reorder}
        options={{
          title: '순서 변경',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  noSeparator: {
    shadowColor: 'transparent',
  },
});
