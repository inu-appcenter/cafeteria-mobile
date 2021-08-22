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
import {AnimatedSVGPath} from 'react-native-svg-animations';
import React from 'react';
import {View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

type Props = {
  value: string;
};

export default function BorderedQRCode({value}: Props) {
  const d = 'M5 5H120V120H5z';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedSVGPath
        strokeDashArray={[120, 120]}
        strokeColor={'red'}
        strokeWidth={2}
        duration={3000}
        height={120}
        width={120}
        delay={0}
        d={d}
        loop={true}
      />
      <View
        style={{
          position: 'absolute',
        }}>
        <QRCode value={value} size={100} />
      </View>
    </View>
  );
}
