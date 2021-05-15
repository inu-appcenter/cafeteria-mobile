import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MembershipNavigationParams} from './MembershipScreen';
import PaperPresets from '../../components/utils/PaperPresets';
import {Button} from 'react-native-paper';
import palette from '../../res/palette';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'Onboarding'>;
};

export default function OnboardingScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>학생 할인 멤버십</Text>
        <Text style={styles.body}>
          재학생을 위한 할인 혜택을 제공합니다. 로그인하시고 이용해 보세요 :)
        </Text>
      </View>
      <Button
        {...PaperPresets.wideButton}
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        시작하기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textSection: {
    flex: 0.4,
    marginHorizontal: 12,
  },
  title: {
    ...palette.textHeader,
  },
  body: {
    ...palette.textSecondary,
    marginTop: 12,
  },
  button: {
    position: 'absolute',
    bottom: 12,
    start: 12,
    end: 12,
  },
});
