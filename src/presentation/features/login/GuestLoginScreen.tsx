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

import useApi from '../../hooks/useApi';
import colors from '../../res/colors';
import palette from '../../res/palette';
import useStores from '../../hooks/useStores';
import PaperPresets from '../../components/utils/PaperPresets';
import ItemSeparator from '../../components/ItemSeparator';
import handleApiError from '../../../common/utils/handleApiError';
import React, {useState} from 'react';
import ClearableTextInput from '../../components/ClearableTextInput';
import {Button, TextInput} from 'react-native-paper';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

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
      .catch(handleApiError);
  };

  const login = async () => {
    if (loginLoading || !passcodeValid()) {
      return;
    }

    invokeLogin().catch(handleApiError);
  };

  const phase1 = (
    <View>
      <ClearableTextInput
        {...PaperPresets.idTextInput}
        value={phoneNumber}
        style={styles.input}
        label="??????????????????"
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
        ???????????? ??????
      </Button>
    </View>
  );

  const phase2 = (
    <View>
      <ItemSeparator style={{marginTop: 18}} />

      <TextInput
        {...PaperPresets.idTextInput}
        value={passcode}
        style={styles.input}
        right={<TextInput.Icon onPress={getChallenge} name={'refresh'} color={colors.textSecondary} />}
        label="????????????"
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
        ?????????
      </Button>
    </View>
  );

  return (
    <View style={[palette.fullSized, palette.whiteBackground]}>
      <ScrollView contentContainerStyle={palette.horizontalSpace}>
        {phase1}

        {challengeRequestSucceeded ? phase2 : undefined}

        <Text style={styles.text}>
          ????????? ????????? ?????? ????????? 1??? ?????? ????????? ??? ????????????. 1??? ?????? ??????????????? ???????????? ????????? ????????????
          ?????? ?????????.
        </Text>
        <Text style={styles.text}>???????????? ??????????????? ??????????????? ???????????????.</Text>
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
