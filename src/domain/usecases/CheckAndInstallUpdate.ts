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

import UseCase from './UseCase';
import codePush from 'react-native-code-push';

class CheckAndInstallUpdate extends UseCase {
  async onExecute(params: void): Promise<void> {
    try {
      await this.checkAndInstall();
    } catch (e) {
      console.log(
        '앗... 코드푸시 에러입니다. 아마 debug 빌드라서 deployment key가 없어서 생긴 문제일 가능성이 큽니다.',
      );
    }
  }

  private async checkAndInstall() {
    const newPackage = await this.downloadNewUpdate();
    if (newPackage == null) {
      return;
    }

    if (newPackage.isMandatory) {
      await newPackage.install(codePush.InstallMode.IMMEDIATE);
    } else {
      await newPackage.install(codePush.InstallMode.ON_NEXT_RESTART);
    }
  }

  private async downloadNewUpdate() {
    const update = await codePush.checkForUpdate();
    if (update == null) {
      return null; // pending도 이 경우입니다.
    }

    console.log(`업데이트가 존재합니다: ${JSON.stringify(update)}.`);

    return await update.download(progress => {
      console.log(
        `업데이트 다운로드 중: ${progress.receivedBytes}/${progress.totalBytes}Bytes`,
      );
    });
  }
}

export default new CheckAndInstallUpdate();
