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

import Icons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import PackageInfo from '../../../../common/PackageInfo';
import React, {useEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

function Version() {
  const {versionStore} = useStores();

  useEffect(() => {
    versionStore.fetchVersionInfo();
  }, []);

  const minimumSupportedOsVersion =
    Platform.OS === 'ios' ? 'iOS 12.0' : 'Android 8.0';

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icons
          name={versionStore.pendingUpdate ? 'autorenew' : 'check'}
          style={styles.marginOnBottom}
          color={colors.textPrimary}
          size={36}
        />

        <Text style={[palette.textSubHeader, styles.marginOnTop]}>
          {versionStore.pendingUpdate
            ? '대기중인 업데이트가 있습니다.'
            : '최신 버전입니다.'}
        </Text>
        <Text style={[palette.textSecondary, styles.marginOnTop]}>
          현재 버전 {PackageInfo.version}(
          {versionStore.runningUpdate?.label || '-'})
        </Text>
      </View>
      <Text style={[palette.textTertiary, styles.marginOnBottom]}>
        {minimumSupportedOsVersion} 이상 지원합니다.
      </Text>
    </View>
  );
}

export default observer(Version);

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
  marginOnTop: {
    marginTop: 12,
  },
  marginOnBottom: {
    marginBottom: 12,
  },
});
