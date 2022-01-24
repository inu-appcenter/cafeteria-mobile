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

import 'reflect-metadata'; // 이 녀석 위치가 참 중요합니다. 제일 처음에 있어야 해요!
import 'react-native-gesture-handler'; // iOS 릴리즈 빌드에서 뒤로가기 버튼 뻗는 문제 해결하려면 얘가 필요해요!

import App from './src/presentation/App';
import {name} from './app.json';
import codePush from 'react-native-code-push';
import setupAxios from './src/common/utils/setupAxios';
import {AppRegistry} from 'react-native';
import ignoreWarnings from './src/common/utils/ignoreWarnings';

setupAxios();
ignoreWarnings();

AppRegistry.registerComponent(name, () => codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App));
