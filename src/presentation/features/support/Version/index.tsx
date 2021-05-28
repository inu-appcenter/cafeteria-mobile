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

import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import codePush from 'react-native-code-push';
import PackageInfo from '../../../../common/PackageInfo';
import PaperPresets from '../../../components/utils/PaperPresets';
import CheckForUpdates from '../../../../domain/usecases/CheckForUpdates';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function Version() {
  const [loading, check] = useApi(() => CheckForUpdates.run());

  const [codePushLabel, setCodePushLabel] = useState('-');

  useEffect(() => {
    codePush.getUpdateMetadata().then(metadata => {
      setCodePushLabel(metadata?.label || '-');
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={palette.textPrimary}>앱 버전: {PackageInfo.version}</Text>
        <Text style={[palette.textSecondary, styles.marginOnTop]}>
          Bundle 버전: {codePushLabel}
        </Text>
      </View>
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
  container: {
    ...palette.whiteBackground,
    flexDirection: 'column',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginOnTop: {
    marginTop: 8,
  },
  button: {
    margin: 12,
  },
});
