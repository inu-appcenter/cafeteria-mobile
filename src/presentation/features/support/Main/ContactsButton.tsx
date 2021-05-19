import React from 'react';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import CardView from '../../../components/CardView';
import ChevronRight from '../../../components/ChevronRight';
import {SupportMainNavigation} from '../SupportScreen';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  navigation: SupportMainNavigation;
};

export default function ContactsButton({navigation}: Props) {
  return (
    <CardView
      style={styles.helpCard}
      onPress={() => navigation.navigate('SupportContacts')}>
      <View>
        <Text style={styles.helpCardTitleText}>
          서비스 이용에 불편을 겪고 계신가요?
        </Text>
        <Text style={styles.helpCardBodyText}>문의 가능한 연락처 보기</Text>
      </View>
      <ChevronRight />
    </CardView>
  );
}

const styles = StyleSheet.create({
  helpCard: {
    alignSelf: 'stretch',
    margin: 16,
    paddingVertical: 12,
    paddingStart: 12,
    paddingEnd: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  helpCardTitleText: {
    ...palette.textPrimary,
    fontWeight: 'bold',
  },

  helpCardBodyText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
});
