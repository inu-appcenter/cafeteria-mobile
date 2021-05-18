import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import PaperPresets from '../../components/utils/PaperPresets';
import colors from '../../res/colors';
import palette from '../../res/palette';

export default function SupportContactsScreen() {
  return (
    <ScrollView style={palette.whiteBackground}>
      <View style={styles.container}>
        <Button
          {...PaperPresets.wideButton}
          style={styles.bigHelpButton}
          labelStyle={{color: 'white', fontSize: 16}}
          color={colors.themeBlue}>
          소비자생활협동조합
        </Button>
        <Button
          {...PaperPresets.wideButton}
          style={styles.bigHelpButton}
          labelStyle={{color: 'gray', fontSize: 16}}
          color={colors.white}>
          서비스 관리자
        </Button>
        <Button
          {...PaperPresets.wideButton}
          style={styles.bigHelpButton}
          labelStyle={{color: colors.textPrimary, fontSize: 16}}
          color={colors.kakaoYellow}>
          앱센터 센터장
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  titleText: {
    ...palette.textHeader,
    marginTop: 12,
  },

  bigHelpButton: {
    alignSelf: 'stretch',
    marginTop: 12,
    marginHorizontal: 16,
  },
});
