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
import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import PackageInfo from '../../../../common/PackageInfo';
import PaperPresets from '../../../components/utils/PaperPresets';
import CheckForUpdates from '../../../../domain/usecases/CheckForUpdates';
import {StyleSheet, Text, View} from 'react-native';

export default function Version() {
  const [loading, check] = useApi(() => CheckForUpdates.run());

  return (
    <View style={[palette.centeringContainer, palette.whiteBackground]}>
      <Text style={palette.textPrimary}>앱 버전: {PackageInfo.version}</Text>
      <Button
        {...PaperPresets.wideThemedButton}
        style={styles.button}
        loading={loading}
        onPress={check}>
        업데이트 확인
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    end: 12,
    start: 12,
    bottom: 12,
    position: 'absolute',
  },
});
