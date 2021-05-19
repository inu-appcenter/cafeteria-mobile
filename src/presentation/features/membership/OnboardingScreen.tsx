import React from 'react';
import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import LoadingView from '../../components/LoadingView';
import useUserState from '../../hooks/useUserState';
import PaperPresets from '../../components/utils/PaperPresets';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {MembershipNavigationParams} from './MembershipScreen';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'Onboarding'>;
};

export default function OnboardingScreen({navigation}: Props) {
  const {isTryingRememberedLogin} = useUserState();

  const loadingView = <LoadingView />;

  const onboardingContents = (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>🎁 학생 할인 멤버십 🎁</Text>
        <Text style={styles.body}>
          {`생협에서는 재학생을 위한 할인 혜택을 제공합니다.\n로그인하시고 이용해 보세요😊`}
        </Text>
      </View>
      <Button
        {...PaperPresets.wideThemedButton}
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        시작하기
      </Button>
    </View>
  );

  return isTryingRememberedLogin ? loadingView : onboardingContents;
}

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
  button: {
    end: 12,
    start: 12,
    bottom: 12,
    position: 'absolute',
  },
});
