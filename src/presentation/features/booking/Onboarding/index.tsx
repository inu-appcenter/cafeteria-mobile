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
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import palette from '../../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../../hooks/useStores';
import PaperPresets from '../../../components/utils/PaperPresets';
import colors from '../../../res/colors';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';

export default function Onboarding() {
  const {bookingStore} = useStores();

  const [expanded, setExpanded] = useState(false);

  const doneOnboarding = () => bookingStore.doneOnboarding();

  const letsGo = (
    <LinearGradient
      colors={['#ffffff00', 'white', 'white', 'white']}
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 12,
        paddingTop: 24,
      }}>
      <Button {...PaperPresets.wideThemedButton} onPress={doneOnboarding}>
        시작하기
      </Button>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={palette.whiteFullSized}>
      <View style={palette.whiteFullSized}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginHorizontal: 24,
              paddingBottom: 96,
            }}>
            <Text style={styles.title}>
              천원의 아침,{'\n'}미리 예약하고{'\n'}안전하게 입장하세요
            </Text>
            <Text style={styles.titleComplementary}>QR 체크인으로 방역에 동참해주세요</Text>
            {!expanded && (
              <Button
                labelStyle={{color: 'white', fontSize: 14}}
                color={colors.mainTint}
                style={{borderRadius: 25, marginTop: 18}}
                mode="contained"
                onPress={() => setExpanded(true)}>
                예약제를 도입한 계기
              </Button>
            )}
            {expanded && (
              <Text style={styles.body}>
                '천원의 아침'은 학생들에게 많은 관심과 사랑을 받고 있습니다.
                {'\n\n'}
                생협은 코로나로 인하여 어려운 상황 속에서도 학생복지를 위하여 대학(총학생회)과 논의하여 천원의
                아침을 이어나가고 있습니다.
                {'\n\n'}
                그러나 코로나19의 지속으로 방역 관리가 중요한 상황입니다. 이에 따라, 특정 시간대에 수요가
                과도하게 몰리는 것을 방지하기 위해 예약시스템을 '천원의 아침'에 시범 운영하게 되었습니다.
              </Text>
            )}

            <AutoHeightImage
              source={require('../../../res/images/qr_code.png')}
              width={300}
              style={{alignSelf: 'center', marginVertical: 72}}
            />
            <Text style={styles.secondTitle}>이렇게 해보세요</Text>

            <Text style={styles.instructionText}>1. 화면 하단의 예약 버튼을 누른다</Text>
            <AutoHeightImage
              source={require('../../../res/images/booking_onboarding_1.png')}
              width={300}
              style={{alignSelf: 'center', marginBottom: 36}}
            />

            <Text style={styles.instructionText}>2. 식당과 날짜를 고르고 예약한다</Text>
            <AutoHeightImage
              source={require('../../../res/images/booking_onboarding_2.png')}
              width={300}
              style={{alignSelf: 'center', marginBottom: 36}}
            />

            <Text style={styles.instructionText}>3. 예약증을 관리자에게 보여준다</Text>
            <AutoHeightImage
              source={require('../../../res/images/booking_onboarding_3.png')}
              width={300}
              style={{alignSelf: 'center', marginBottom: 36}}
            />
          </View>
        </ScrollView>
        {letsGo}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    ...palette.textBigHeader,
    marginTop: 36,
  },
  titleComplementary: {
    color: colors.lightBlueText,
    fontSize: 18,
    marginTop: 14,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 18,
    marginTop: 18,
  },
  secondTitle: {
    ...palette.textHeader,
  },
  instructionText: {
    color: colors.textSecondary,
    fontSize: 18,
    marginTop: 24,
    marginBottom: 36,
  },
});
