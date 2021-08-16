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
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import useUserState from '../../../hooks/useUserState';
import LoadingView from '../../../components/LoadingView';
import {Button} from 'react-native-paper';
import PaperPresets from '../../../components/utils/PaperPresets';
import {observer} from 'mobx-react';
import palette from '../../../res/palette';
import {BookingNavigationParams} from '../BookingScreen';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingOnboarding'>;
};

function Onboarding({navigation}: Props) {
  const {isTryingRememberedLogin} = useUserState();

  const loadingView = <LoadingView />;

  const choices = (
    <View style={styles.buttonArray}>
      <Button
        {...PaperPresets.wideThemedButton}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('BookingStudentLogin')}>
        재학생 로그인
      </Button>
      <Text style={[palette.textSubSecondary, styles.alternativeText]}>재학생이 아니신가요?</Text>
      <Button
        {...PaperPresets.wideNeutralButton}
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('BookingGuestLogin')}>
        게스트 로그인
      </Button>
    </View>
  );

  const onboardingContents = (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>! 예약 !</Text>
        <Text style={styles.body}>
          {`식당에 예약하고 입장하실 수 있습니다.\n로그인하시고 이용해 보세요😊`}
        </Text>
      </View>
      {choices}
    </View>
  );

  return isTryingRememberedLogin ? loadingView : onboardingContents;
}

export default observer(Onboarding);

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
  buttonArray: {
    end: 12,
    start: 12,
    bottom: 12,
    position: 'absolute',
  },
  primaryButton: {},
  secondaryButton: {
    marginTop: 8,
  },
  alternativeText: {
    marginTop: 8,
    alignSelf: 'center',
  },
});
