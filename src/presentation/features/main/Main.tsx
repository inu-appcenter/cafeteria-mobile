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
import {View} from 'react-native';
import palette from '../../res/palette';
import {observer} from 'mobx-react';
import ToastModal from '../../components/ToastModal';
import NoticeModal from '../../components/NoticeModal';
import WhiteStatusBar from '../../components/WhiteStatusBar';
import MainModal from './MainModal';

function Main() {
  /**
   * 주의:
   * View 안에 배치되는 순서가 중요합니다.
   * ToastModal은 MainModal 이후에 등장해야 가려지지 않습니다.
   * NoticeModal은 무엇에도 가려지면 안되기 때문에 가장 마지막에 둡니다.
   */
  return (
    <View style={palette.fullSized}>
      <WhiteStatusBar />
      <MainModal />
      <ToastModal />
      <NoticeModal />
    </View>
  );
}

export default observer(Main);
