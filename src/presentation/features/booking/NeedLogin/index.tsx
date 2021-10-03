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
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import {observer} from 'mobx-react';
import LoadingView from '../../../components/LoadingView';
import useUserState from '../../../hooks/useUserState';
import PaperPresets from '../../../components/utils/PaperPresets';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {BookingNavigationParams} from '../BookingScreen';
import useStores from '../../../hooks/useStores';
import OnboardingHintCard from '../OnboardingHintCard';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingNeedLogin'>;
};

function NeedLogin({navigation}: Props) {
  const {isTryingRememberedLogin} = useUserState();
  const {bookingStore} = useStores();

  const goStudentLogin = () => navigation.navigate('BookingStudentLogin');
  const goGuestLogin = () => navigation.navigate('BookingGuestLogin');

  const loadingView = <LoadingView />;

  const choices = (
    <View style={styles.buttons}>
      <Button {...PaperPresets.wideThemedButton} onPress={goStudentLogin}>
        학번으로 로그인
      </Button>
      <Text onPress={goGuestLogin} style={styles.alternativeText}>
        재학생이 아니신가요? 전화번호로 로그인
      </Text>
    </View>
  );

  const onboardingContents = (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>🍽 로그인이 필요해요 🍽</Text>
        <Text style={styles.body}>
          {`식당에 예약하고 입장하실 수 있습니다.\n로그인하시고 이용해 보세요😊`}
        </Text>
      </View>
      {choices}

      {!bookingStore.usedToBookingFeature && <OnboardingHintCard style={styles.hintContainer} />}
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
  secondaryButton: {
    marginTop: 8,
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    start: 16,
    end: 16,
  },
  alternativeText: {
    ...palette.textSubSecondary,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  hintContainer: {
    position: 'absolute',
    padding: 16,
    bottom: 108,
    left: 16,
    right: 16,
  },
});
