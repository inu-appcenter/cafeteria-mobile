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

import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import alert from '../../../components/utils/alert';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';

export default function UpdateInfoHeaderButton() {
  const {versionStore} = useStores();

  const showDescription = () => {
    if (versionStore.pendingUpdate) {
      alert(
        '대기중인 업데이트',
        '새 업데이트가 다운로드되어 설치를 기다리는 중입니다. 다음에 앱을 다시 실행할 때에 업데이트가 설치됩니다.',
      );
    } else {
      alert('최신 버전', '모든 업데이트가 설치되었습니다.');
    }
  };

  return (
    <Icon
      name={'info'}
      size={24}
      color={colors.textPrimary}
      style={palette.iconHeaderButton}
      onPress={showDescription}
    />
  );
}
