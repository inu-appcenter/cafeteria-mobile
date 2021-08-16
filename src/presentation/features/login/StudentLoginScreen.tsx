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

import useApi from '../../hooks/useApi';
import colors from '../../res/colors';
import notify from '../../components/utils/notify';
import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../components/utils/PaperPresets';
import Unauthorized from '../../../data/exceptions/Unauthorized';
import handleApiError from '../../../common/utils/handleApiError';
import ClearableTextInput from '../../components/ClearableTextInput';
import React, {createRef, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';

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
    if (loading) {
      return;
    }

    if (!formValid()) {
      return;
    }

    invoke().catch(e =>
      e instanceof Unauthorized ? notify('학번과 비밀번호를 확인해 주세요 😉') : handleApiError(e),
    );
  };

  return (
    <View style={[palette.fullSized, palette.whiteBackground]}>
      <ScrollView contentContainerStyle={palette.horizontalSpace}>
        <ClearableTextInput
          {...PaperPresets.idTextInput}
          value={studentId}
          style={styles.input}
          label="학번"
          onChangeText={setStudentId}
          autoFocus={true}
          onSubmitEditing={() => passwordFieldRef.current?.focus()}
        />
        <ClearableTextInput
          {...PaperPresets.passwordTextInput}
          ref={passwordFieldRef}
          value={password}
          style={styles.input}
          label="비밀번호"
          onChangeText={setPassword}
          onSubmitEditing={() => login()}
        />
        <Button
          {...PaperPresets.wideThemedButton}
          style={styles.primaryButton}
          loading={loading}
          disabled={!formValid()}
          onPress={login}>
          로그인
        </Button>
        <Text style={styles.text}>
          입력하신 개인정보는 암호화되어 전송되며, 본교 재학 여부를 판단하는 데에 사용된 후 즉시
          폐기됩니다.
        </Text>
        <Text style={styles.text}>
          할인 혜택을 제공받는 대상은 다음과 같습니다: 인천대학교 학과/학부 재학생 및 휴학생, 대학원
          재학생 및 휴학생, 한국어학당 수강생 및 수료생
        </Text>
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
