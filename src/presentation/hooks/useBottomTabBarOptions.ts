import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';

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

/**
 * 플랫폼마다, 기기마다 다른 바텀 네비게이션 바의 높이를 계산해 주는 훅입니다.
 */
export default function useBottomTabBarOptions() {
  return Platform.OS === 'ios' ? iosBestLook() : androidBestLook();
}

function iosBestLook() {
  const insets = useSafeAreaInsets();

  return {
    style: {height: 50 + insets.bottom},
    tabStyle: {height: 50, paddingBottom: insets.bottom > 0 ? 2 : 4},
    labelStyle: {fontSize: 11},
  };
}

function androidBestLook() {
  const insets = useSafeAreaInsets();

  return {
    style: {height: 56 + insets.bottom},
    tabStyle: {height: 54, paddingVertical: 5},
    labelStyle: {fontSize: 12},
  };
}
