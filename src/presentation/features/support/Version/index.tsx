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

import palette from '../../../res/palette';
import PackageInfo from '../../../../common/PackageInfo';
import codePush, {LocalPackage} from 'react-native-code-push';
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default function Version() {
  const [packageInfo, setPackageInfo] = useState<LocalPackage | null>();
  const [title, setTitle] = useState('');

  useEffect(() => {
    codePush.getUpdateMetadata(codePush.UpdateState.LATEST).then(metadata => {
      setPackageInfo(metadata);
      setTitle(
        metadata === null || metadata?.isPending
          ? '대기중인 업데이트가 있습니다.'
          : '최신 버전입니다.',
      );
    });
  }, []);

  const minimumSupportedOsVersion =
    Platform.OS === 'ios' ? 'iOS 12.0' : 'Android 8.0';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={palette.textSubHeader}>{title}</Text>
        <View style={styles.versionDataContainer}>
          <Text style={[palette.textSecondary]}>
            앱 버전: {PackageInfo.version}
          </Text>
          <Text style={[palette.textSecondary, styles.marginOnTop]}>
            최신 Bundle 버전: {packageInfo?.label?.replace('v', '') || '-'}
          </Text>
        </View>
      </View>
      <Text style={[palette.textTertiary, styles.marginOnBottom]}>
        {minimumSupportedOsVersion} 이상 지원합니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...palette.whiteBackground,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionDataContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  marginOnTop: {
    marginTop: 4,
  },
  marginOnBottom: {
    marginBottom: 12,
  },
});
