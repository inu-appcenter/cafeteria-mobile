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
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import {observer} from 'mobx-react';
import LoadingView from '../../../components/LoadingView';
import useUserState from '../../../hooks/useUserState';
import PaperPresets from '../../../components/utils/PaperPresets';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {MembershipNavigationParams} from '../MembershipScreen';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'MembershipNeedLogin'>;
};

function NeedLogin({navigation}: Props) {
  const {isTryingRememberedLogin} = useUserState();

  const loadingView = <LoadingView />;

  const onboardingContents = (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>π λ‘κ·ΈμΈμ΄ νμν΄μ π</Text>
        <Text style={styles.body}>
          {`μνμμλ μ¬νμμ μν ν μΈ ννμ μ κ³΅ν©λλ€.\nλ‘κ·ΈμΈνμκ³  μ΄μ©ν΄ λ³΄μΈμπ`}
        </Text>
      </View>
      <Button
        {...PaperPresets.wideThemedButton}
        style={palette.bottomButton}
        onPress={() => navigation.navigate('MembershipStudentLogin')}>
        νλ²μΌλ‘ λ‘κ·ΈμΈ
      </Button>
    </View>
  );

  return isTryingRememberedLogin ? loadingView : onboardingContents;
}

export default observer(NeedLogin);

const styles = StyleSheet.create({
  container: {
    ...palette.whiteBackground,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textSection: {
    flex: 0.2,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    ...palette.textHeader,
  },
  body: {
    ...palette.textSecondary,
    marginTop: 18,
    textAlign: 'center',
  },
});
