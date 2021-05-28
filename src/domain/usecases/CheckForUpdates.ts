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

import alert from '../../presentation/components/utils/alert';
import UseCase from './UseCase';
import codePush from 'react-native-code-push';

class CheckForUpdates extends UseCase {
  async onExecute(_: void): Promise<void> {
    const syncStatus = await codePush.sync({
      updateDialog: {
        title: '업데이트 사용 가능',
        optionalUpdateMessage:
          '새 업데이트를 설치할까요? 오래 걸리지 않습니다.',
        optionalInstallButtonLabel: '설치',
        optionalIgnoreButtonLabel: '취소',

        mandatoryUpdateMessage: '꼭 설치해야 하는 중요한 업데이트가 있습니다.',
        mandatoryContinueButtonLabel: '설치',
      },
      installMode: codePush.InstallMode.IMMEDIATE,
    });

    if (
      syncStatus === codePush.SyncStatus.UP_TO_DATE ||
      syncStatus === codePush.SyncStatus.UPDATE_INSTALLED
    ) {
      alert('업데이트 없음', '최신 버전입니다.');
    }
  }
}

export default new CheckForUpdates();
