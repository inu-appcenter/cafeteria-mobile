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

import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import useStores from '../../hooks/useStores';
import useApi from '../../hooks/useApi';
import Unauthorized from '../../../data/exceptions/Unauthorized';
import notify from '../../components/utils/notify';
import handleApiError from '../../../common/utils/handleApiError';
import palette from '../../res/palette';
import ClearableTextInput from '../../components/ClearableTextInput';
import PaperPresets from '../../components/utils/PaperPresets';
import {Button} from 'react-native-paper';
import colors from '../../res/colors';

export default function GuestLoginScreen() {
  const {userStore} = useStores();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [passcode, setPasscode] = useState('');
  const [challengeRequestSucceeded, setChallengeRequestSucceeded] = useState(false);

  const [getChallengeLoading, invokeGetChallenge] = useApi(() => userStore.guestChallenge(phoneNumber));
  const [loginLoading, invokeLogin] = useApi(() => userStore.guestLogin(phoneNumber, passcode));

  const phoneNumberValid = () => /^\d{11}$/.test(phoneNumber);
  const passcodeValid = () => /^\d{4}$/.test(passcode);

  const getChallenge = async () => {
    if (getChallengeLoading || !phoneNumberValid()) {
      return;
    }

    invokeGetChallenge()
      .then(() => setChallengeRequestSucceeded(true))
      .catch(e => handleApiError(e));
  };
  const login = async () => {
    if (loginLoading || !passcodeValid()) {
      return;
    }

    invokeLogin().catch(e =>
      e instanceof Unauthorized ? notify('인증코드를 확인해 주세요 😉') : handleApiError(e),
    );
  };

  const phase1 = (
    <View>
      <ClearableTextInput
        {...PaperPresets.idTextInput}
        value={phoneNumber}
        style={styles.input}
        label="휴대전화번호"
        maxLength={11}
        onChangeText={setPhoneNumber}
        autoFocus={true}
        disabled={challengeRequestSucceeded}
      />

      <Button
        {...PaperPresets.wideThemedButton}
        style={styles.primaryButton}
        loading={getChallengeLoading}
        disabled={!phoneNumberValid() || challengeRequestSucceeded}
        onPress={getChallenge}>
        인증번호 요청
      </Button>
    </View>
  );

  const phase2 = (
    <View>
      <ClearableTextInput
        {...PaperPresets.idTextInput}
        value={passcode}
        style={styles.input}
        label="인증번호"
        maxLength={4}
        onChangeText={setPasscode}
        onSubmitEditing={() => login()}
      />

      <Button
        {...PaperPresets.wideThemedButton}
        style={styles.primaryButton}
        loading={loginLoading}
        disabled={!passcodeValid()}
        onPress={login}>
        로그인
      </Button>
    </View>
  );

  return (
    <View style={[palette.fullSized, palette.whiteBackground]}>
      <ScrollView contentContainerStyle={palette.horizontalSpace}>
        {phase1}
        {challengeRequestSucceeded ? phase2 : undefined}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 12,
    backgroundColor: colors.white,
    paddingVertical: 0,
  },
  primaryButton: {
    marginTop: 16,
  },
  text: {
    ...palette.textTertiary,
    marginTop: 8,
  },
});
