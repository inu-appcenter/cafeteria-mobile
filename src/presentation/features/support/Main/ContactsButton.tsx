import Icon from 'react-native-vector-icons/Feather';
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
      <View style={styles.container}>
        <Icon name="phone" size={24} />
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.helpCardTitleText}>
              서비스 이용에 불편을 겪고 계신가요?
            </Text>
            <Text style={styles.helpCardBodyText}>문의 가능한 연락처 보기</Text>
          </View>
          <ChevronRight />
        </View>
      </View>
    </CardView>
  );
}

const styles = StyleSheet.create({
  helpCard: {
    paddingVertical: 12,
    paddingStart: 12,
    paddingEnd: 4,
    margin: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 12,
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
