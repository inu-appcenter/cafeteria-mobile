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

import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../hooks/useStores';
import PaperPresets from '../../components/utils/PaperPresets';
import CheckBoxItem from './CheckBoxItem';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

export default function AgreementScreen() {
  const {userStore} = useStores();

  const [agreeToFirst, setAgreeToFirst] = useState(false);
  const [agreeToSecond, setAgreeToSecond] = useState(false);

  const agree = () => userStore.agreePrivacyPolicy();

  return (
    <SafeAreaView style={palette.whiteFullSized}>
      <View style={palette.whiteFullSized}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>서비스 이용을 위해{'\n'}아래 항목에 동의해주세요.</Text>

            <CheckBoxItem
              name="개인정보 수집·이용 동의"
              content="1. 수집항목 : 이름, 전화번호, 생성한 QR코드, QR코드를 생성한 시각, QR코드를 생성한 이용자 식별 정보
2. 이용목적 : 예약관리 및 코로나19 감염병 예방 및 감염 전파의 차단
3. 보유기간 : 4주"
              onCheckChanged={setAgreeToFirst}
            />

            <CheckBoxItem
              name="개인정보 제공 동의"
              content="· 인천대학교소비자생활협동조합에서 예약관리를 하기 위한 정보로 개인 정보가 제공됩니다.
· 확진자 발생 시 역학조사를 위해 보건복지부와 질병관리본부로 QR체크인에서 수집한 개인정보가 제공됩니다.
1. 제공받는자 : 인천대학교소비자생활협동조합, 보건복지부, 질병관리본부
2. 제공목적 : 예약관리, 감염병 예방 및 전파의 차단을 위한 역학조사
3. 제공하는 항목 : 이름, 전화번호, 방문일시
4. 보유기간 : 역학조사 종료 후 파기 "
              onCheckChanged={setAgreeToSecond}
            />
          </View>
        </ScrollView>

        <Button
          {...PaperPresets.wideThemedButton}
          style={styles.primaryButton}
          onPress={agree}
          disabled={!agreeToFirst || !agreeToSecond}>
          동의
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginHorizontal: 12,
  },

  titleText: {
    ...palette.textHeader,
    marginTop: 16,
  },

  primaryButton: {
    end: 12,
    start: 12,
    bottom: 0,
    position: 'absolute',
  },
});
