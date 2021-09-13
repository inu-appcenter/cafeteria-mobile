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
          할인 혜택을 제공받는 대상은 다음과 같습니다: 인천대학교 학과/학부 재학생 및 휴학생, 대학원 재학생 및
          휴학생, 한국어학당 수강생 및 수료생
        </Text>
        <Text style={styles.text}>
          입력하신 개인정보는 암호화되어 전송됩니다. 학번은 본교 재학 여부를 판단하는 데에 사용됩니다. 학번
          또는 전화번호는 교내 식당 예약 및 체크인 시 코로나19 전자출입명부 작성을 대체하기 위해 수집 및
          저장됩니다. 서비스 이용을 계속하시는 경우, 이에 동의하는 것으로 간주합니다.
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
