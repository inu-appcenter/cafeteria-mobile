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

import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';
import React, {ComponentType} from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs/src/types';

export type IconConfigs = Record<string, [string, string, ComponentType<IconProps>?]>;

/**
 * Tab bar icon selector generator for BottomTabNavigator.
 *
 * @param icons pairs of tab name to icon names.
 *              The icons names is an array of size 2,
 *              having first item as an unfocused icon name,
 *              and the second as a focused one.
 * @param screenName name of the route.
 */
export default function tabBarIconSelector(
  icons: IconConfigs,
  screenName: string,
): BottomTabNavigationOptions['tabBarIcon'] {
  return ({focused, color, size}) => {
    const IconClass = icons[screenName]?.[2] || Ionicons;

    return <IconClass name={icons[screenName]?.[focused ? 0 : 1] || 'error'} size={size} color={color} />;
  };
}
