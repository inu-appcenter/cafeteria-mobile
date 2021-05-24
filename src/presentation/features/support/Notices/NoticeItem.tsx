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

import Icons from 'react-native-vector-icons/Feather';
import colors from '../../../res/colors';
import palette from '../../../res/palette';
import NoticeView from './NoticeView';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

type Props = {
  notice: NoticeView;
};

export default function NoticeItem({notice}: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const chevron = expanded ? (
    <Icons name={'chevron-up'} size={20} color={colors.textSecondary} />
  ) : (
    <Icons name={'chevron-down'} size={20} color={colors.textSecondary} />
  );

  const titleArea = (
    <View style={styles.titleAreaContainer}>
      <View style={styles.titleAreaDateAndTitleContainer}>
        <Text style={styles.textDate}>{notice.date}</Text>
        <Text style={styles.textTitle}>{notice.title}</Text>
      </View>
      {chevron}
    </View>
  );

  const bodyArea = (
    <View style={styles.bodyAreaContainer}>
      <Text style={styles.bodyText}>{notice.body}</Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={toggleExpanded}>
      <View>
        {titleArea}
        {expanded ? bodyArea : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  titleAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleAreaDateAndTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textDate: {
    ...palette.textSubSecondary,
  },
  textTitle: {
    ...palette.textPrimary,
    marginTop: 6,
  },
  bodyAreaContainer: {
    padding: 16,
    backgroundColor: colors.grayishWhite,
  },
  bodyText: {
    ...palette.textSubPrimary,
  },
});
