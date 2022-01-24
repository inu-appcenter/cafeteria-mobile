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

import {Alert} from 'react-native';

export default function alert(title: string, message?: string) {
  Alert.alert(title, message, [{text: '확인', style: 'default'}], {
    cancelable: true,
  });
}

export function cancelBookingAlert(title: string, message: string, onPress: () => void) {
  Alert.alert(
    title,
    message,
    [
      {text: '닫기', style: 'cancel'},
      {text: '예약 취소', style: 'destructive', onPress},
    ],
    {
      cancelable: true,
    },
  );
}

export function logoutAlert(title: string, message: string, onPress: () => void) {
  Alert.alert(
    title,
    message,
    [
      {text: '닫기', style: 'cancel'},
      {text: '로그아웃', style: 'destructive', onPress},
    ],
    {
      cancelable: true,
    },
  );
}
