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

// @ts-ignore
import DeviceBrightness from '@adrianso/react-native-device-brightness';
import {makeAutoObservable} from 'mobx';
import {Platform} from 'react-native';
import range from '../../../common/utils/range';

export default class HardwareStore {
  private _isBright = false;
  get isBright() {
    return this._isBright;
  }
  set isBright(value) {
    this._isBright = value;
  }

  private _originalBrightness = 0;
  get originalBrightness() {
    return this._originalBrightness;
  }
  set originalBrightness(value) {
    this._originalBrightness = value;
  }

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 밝기를 밝게 또는 원래대로 토글합니다.
   * iOS 한정으로 페이드 효과가 있습니다.
   */
  async toggleBrightness() {
    const fadeDuration = Platform.OS === 'ios' ? 0.8 : 0;
    const currentBrightness = await DeviceBrightness.getBrightnessLevel(); // 항상 1이 아닐 수 있어요.

    if (this.isBright) {
      await this.fadeBrightness(currentBrightness, this.originalBrightness, fadeDuration);
    } else {
      this.originalBrightness = currentBrightness;

      await this.fadeBrightness(currentBrightness, 1, fadeDuration);
    }

    this.isBright = !this.isBright;
  }

  /**
   * 화면 밝기를 duration동안 from에서 to로 변화시킵니다.
   *
   * @param from
   * @param to
   * @param duration
   */
  private async fadeBrightness(from: number, to: number, duration: number) {
    if (duration === 0) {
      await DeviceBrightness.setBrightnessLevel(to);
      return;
    }

    const fps = 320; // 이정도는 되어야 자연스럽게 느껴집니다.
    const totalFrames = fps * duration;

    const values = range(from, to, totalFrames);

    for (const value of values) {
      await DeviceBrightness.setBrightnessLevel(value);
    }
  }
}
