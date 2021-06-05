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

import Icon from 'react-native-vector-icons/FontAwesome';
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
        <View style={styles.callIconContainer}>
          <Icon name="phone" size={24} color={colors.white} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.helpCardTextContainer}>
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
  callIconContainer: {
    backgroundColor: colors.green,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 12,
  },
  helpCardTextContainer: {
    flex: 1,
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
