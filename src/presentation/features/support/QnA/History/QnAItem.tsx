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

import colors from '../../../../res/colors';
import palette from '../../../../res/palette';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Touchable from '../../../../components/Touchable';
import useStores from '../../../../hooks/useStores';
import handleApiError from '../../../../../common/utils/handleApiError';
import React, {useState} from 'react';
import QuestionWithAnswerView from '../QuestionWithAnswerView';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  qna: QuestionWithAnswerView;
};

export default function QnAItem({qna}: Props) {
  const COLLAPSED_MAX_LINES = 2;
  const EXPANDED_MAX_LINES = 0;

  const {qnaStore} = useStores();
  const [lines, setLines] = useState(COLLAPSED_MAX_LINES);
  const [answerRead, setAnswerRead] = useState(qna.answer?.read);

  const questionPart = (
    <View>
      <View style={styles.questionMetadataContainer}>
        <Text style={palette.textSubSecondary}>{qna.date}</Text>
        <Text style={palette.textSubSecondary}>{qna.answerStatus}</Text>
      </View>
      <Text style={styles.questionBody} numberOfLines={lines} ellipsizeMode="tail">
        {qna.content}
      </Text>
    </View>
  );

  const answerUnreadDot = (
    <Octicons name="primitive-dot" color="orange" style={styles.answerUnreadDotStyle} size={16} />
  );

  const answerPart = (
    <View style={styles.answerContainer}>
      <Feather name={'corner-down-right'} color={colors.textPrimary} />
      <View style={styles.answerRightContainer}>
        <View style={styles.answerTitleContainer}>
          {answerRead ? null : answerUnreadDot}
          <Text style={styles.answerTitle}>{qna.answer?.title}</Text>
        </View>
        <Text style={styles.answerBody} numberOfLines={lines} ellipsizeMode="tail">
          {qna.answer?.body}
        </Text>
      </View>
    </View>
  );

  const focusAnswer = () => {
    setLines(EXPANDED_MAX_LINES);

    if (!answerRead && qna.answer !== undefined) {
      qnaStore.markAnswerRead(qna.answer.id).catch(handleApiError);

      // 위 요청이 성공했든 아니든 일단 컴포넌트에서는 답변을 읽은 것으로 시각적 피드백을 줍니다.
      setAnswerRead(true);
    }
  };

  return (
    <Touchable onPress={focusAnswer}>
      <View style={styles.container}>
        {questionPart}
        {qna.answer ? answerPart : null}
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  questionMetadataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionBody: {
    ...palette.textSubPrimary,
    marginTop: 6,
  },
  answerContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  answerRightContainer: {
    backgroundColor: colors.grayishWhite,
    borderRadius: 8,
    marginStart: 6,
    padding: 12,
    flex: 1,
  },
  answerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerUnreadDotStyle: {
    marginEnd: 6,
  },
  answerTitle: {
    ...palette.textSubPrimary,
    ...palette.boldText,
  },
  answerBody: {
    ...palette.textSubPrimary,
    marginTop: 6,
  },
});
