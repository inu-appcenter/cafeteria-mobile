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

import toast from '../../presentation/components/utils/toast';
import Config from '../../common/Config';
import UseCase from './UseCase';
import codePush from 'react-native-code-push';

class CheckAndInstallUpdate extends UseCase {
  private async checkAndInstall() {
    console.log('업데이트를 확인합니다.');

    const update = await codePush.checkForUpdate();
    if (update === null) {
      // 업데이트가 설치되었으나 앱을 재시작하지 않은 경우(=pending)도 여기에 속합니다.
      console.log('업데이트가 없습니다.');
      return;
    }

    console.log(
      `업데이트가 존재합니다. Label은 [${update.label}], package hash는 [${update.packageHash}].`,
    );

    if (update.isMandatory) {
      console.log('이 업데이트는 필수입니다.');

      toast(
        `중요한 업데이트가 있습니다(${update.label})`,
        '앱을 다시 시작하면 업데이트가 설치됩니다.',
        0,
      );
    }

    console.log('업데이트를 다운로드합니다.');

    const downloadedPackage = await update.download(progress => {
      console.log(
        `업데이트 다운로드 중: ${progress.receivedBytes}/${progress.totalBytes}Bytes`,
      );
    });

    console.log('업데이트를 설치합니다.');

    await downloadedPackage.install(
      codePush.InstallMode.ON_NEXT_RESUME,
      Config.update.minimumBackgroundDurationMinutes,
    );

    console.log(
      `업데이트가 설치되었습니다. 앱 재시작 또는 ${Config.update.minimumBackgroundDurationMinutes}분 이상 중단 후 재개 시 업데이트가 적용됩니다.`,
    );
  }

  async onExecute(params: void): Promise<void> {
    try {
      await this.checkAndInstall();
    } catch (e) {
      console.log(
        '앗... 코드푸시 에러입니다. 아마 debug 빌드라서 deployment key가 없어서 생긴 문제일 가능성이 큽니다.',
      );
    }
  }
}

export default new CheckAndInstallUpdate();
