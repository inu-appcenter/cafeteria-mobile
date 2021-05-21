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
    <Icons name={'chevron-up'} size={20} color={colors.textTertiary} />
  ) : (
    <Icons name={'chevron-down'} size={20} color={colors.textTertiary} />
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
    padding: 16,
  },
  titleAreaDateAndTitleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textDate: {
    ...palette.textTertiary,
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
    ...palette.textPrimary,
    fontSize: 14,
  },
});
