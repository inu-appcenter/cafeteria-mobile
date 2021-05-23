import colors from '../../../../res/colors';
import useApi from '../../../../hooks/useApi';
import notify from '../../../../components/utils/notify';
import palette from '../../../../res/palette';
import {Button} from 'react-native-paper';
import useStores from '../../../../hooks/useStores';
import PaperPresets from '../../../../components/utils/PaperPresets';
import handleApiError from '../../../../../common/utils/handleApiError';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';

export default function Ask() {
  const {directInquiryStore} = useStores();

  const [content, setContent] = useState('');

  const [loading, ask] = useApi(() => directInquiryStore.ask(content));
  const [, fetchHistories] = useApi(() => directInquiryStore.fetchHistories());

  const submitQuestion = async () => {
    if (loading) {
      return;
    }

    try {
      await ask();
      notify('문의가 접수되었습니다.');
      setContent('');

      // 문의 직후에는 지난 문의 내역을 업데이트해 줍니다.
      await fetchHistories();
    } catch (e) {
      handleApiError(e);
    }
  };

  return (
    <ScrollView style={palette.whiteBackground}>
      <View>
        <TextInput
          value={content}
          style={styles.input}
          onChangeText={setContent}
          multiline={true}
          autoFocus={true}
          placeholder="문의하실 내용을 입력해 주세요 :)"
          selectionColor={colors.mainTint}
          placeholderTextColor={colors.textSecondary}
        />
        <Button
          {...PaperPresets.wideThemedButton}
          style={styles.button}
          onPress={submitQuestion}
          loading={loading}
          disabled={content.length <= 0}>
          문의하기
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    ...palette.textPrimary,
    height: 200,
    margin: 16,
    paddingTop: 12, // paddingVertical은 안되고 paddingTop + paddingBottom은 된다! 왜냐? multiline이라서..
    paddingBottom: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    marginHorizontal: 16,
  },
});
