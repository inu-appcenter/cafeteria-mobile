import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {SupportNavigationParams} from './SupportScreen';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../res/colors';
import CardView from '../../components/CardView';

type Props = {
  navigation: StackNavigationProp<SupportNavigationParams, 'SupportMain'>;
};

export default function ShowContactsButton({navigation}: Props) {
  return (
    <CardView
      style={styles.helpCard}
      onPress={() => navigation.navigate('SupportContacts')}>
      <View style={styles.helpCardTextContentContainer}>
        <Text style={styles.helpCardTitleText}>
          서비스 이용에 불편을 겪고 계신가요?
        </Text>
        <Text style={styles.helpCardBodyText}>문의 가능한 연락처 보기</Text>
      </View>
      <Icon name={'chevron-right'} size={24} color={colors.textPrimary} />
    </CardView>
  );
}

const styles = StyleSheet.create({
  helpCard: {
    alignSelf: 'stretch',
    margin: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  helpCardTextContentContainer: {
    padding: 12,
  },

  helpCardTitleText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  helpCardBodyText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
});
