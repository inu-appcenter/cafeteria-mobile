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
import QRCode from 'react-native-qrcode-svg';
import palette from '../../../res/palette';
import {StyleSheet, View} from 'react-native';

// @ts-ignore
import {AnimatedSVGPath} from 'react-native-svg-animations';

type Props = {
  value: string;
  showBorderAnimation: boolean;
};

export default function BorderedQRCode({value, showBorderAnimation}: Props) {
  const d = 'M5 5H120V120H5z';

  const withBorder = (
    <View style={palette.centeringContainer}>
      <AnimatedSVGPath
        d={d}
        loop={true}
        delay={0}
        width={120}
        height={120}
        duration={3000}
        strokeWidth={2}
        strokeColor={'red'}
        strokeDashArray={[120, 120]}
      />
      <View style={styles.concrete}>
        <QRCode value={value} size={100} />
      </View>
    </View>
  );

  const withoutBorder = <QRCode value={value} size={100} />;

  return showBorderAnimation ? withBorder : withoutBorder;
}

const styles = StyleSheet.create({
  concrete: {
    position: 'absolute',
  },
});
