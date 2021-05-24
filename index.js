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

import 'reflect-metadata'; // 이 녀석 위치가 참 중요합니다. 제일 처음에 있어야 해요!

import App from './src/presentation/App';
import setupAxios from './src/common/utils/setupAxios';
import {name as appName} from './app.json';
import {AppRegistry, LogBox} from 'react-native';

setupAxios();

LogBox.ignoreLogs(['ReactNativeFiberHostComponent', 'Reanimated 2']);

AppRegistry.registerComponent(appName, () => App);
