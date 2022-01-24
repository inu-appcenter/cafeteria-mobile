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

import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

/**
 * 전역에서 사용할 네비게이션 ref입니다.
 */
export const navigationRef = React.createRef<NavigationContainerRef>();

/**
 * 네비게이션 컴포넌트 없이 전역 네비게이션을 사용할 수 있습니다.
 *
 * @param name 목적지 라우트 이름.
 * @param params 파라미터.
 */
export function navigateGlobal(name: string, params?: Record<string, any>) {
  navigationRef.current?.navigate(name, params);
}
