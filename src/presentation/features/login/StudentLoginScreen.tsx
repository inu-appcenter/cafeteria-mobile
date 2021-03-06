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
import {Button} from 'react-native-paper';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../components/utils/PaperPresets';
import handleApiError from '../../../common/utils/handleApiError';
import ClearableTextInput from '../../components/ClearableTextInput';
import React, {createRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

function StudentLoginScreen() {
  const {userStore} = useStores();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const [loading, invoke] = useApi(() => userStore.studentLogin(studentId, password));

  const passwordFieldRef = createRef<ClearableTextInput>();

  const formValid = () => {
    return studentId.length > 0 && password.length > 0;
  };

  const login = async () => {
    if (loading || !formValid()) {
      return;
    }

    invoke().catch(handleApiError);
  };

  return (
    <View style={[palette.fullSized, palette.whiteBackground]}>
      <ScrollView contentContainerStyle={palette.horizontalSpace}>
        <ClearableTextInput
          {...PaperPresets.idTextInput}
          value={studentId}
          style={styles.input}
          label="??????"
          onChangeText={setStudentId}
          autoFocus={true}
          onSubmitEditing={() => passwordFieldRef.current?.focus()}
        />
        <ClearableTextInput
          {...PaperPresets.passwordTextInput}
          ref={passwordFieldRef}
          value={password}
          style={styles.input}
          label="????????????"
          onChangeText={setPassword}
          onSubmitEditing={() => login()}
        />
        <Button
          {...PaperPresets.wideThemedButton}
          style={styles.primaryButton}
          loading={loading}
          disabled={!formValid()}
          onPress={login}>
          ?????????
        </Button>

        <Text style={styles.text}>
          ?????? ????????? ???????????? ????????? ????????? ????????????: ??????????????? ??????/?????? ????????? ??? ?????????, ????????? ????????? ???
          ?????????, ??????????????? ????????? ??? ?????????
        </Text>
        <Text style={styles.text}>???????????? ??????????????? ??????????????? ???????????????.</Text>
      </ScrollView>
    </View>
  );
}

export default observer(StudentLoginScreen);

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
