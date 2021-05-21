import colors from '../../../../res/colors';
import palette from '../../../../res/palette';
import {Button} from 'react-native-paper';
import PaperPresets from '../../../../components/utils/PaperPresets';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';

export default function Ask() {
  const [content, setContent] = useState('');

  return (
    <ScrollView style={palette.whiteBackground}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setContent}
          multiline={true}
          autoFocus={true}
          placeholder="문의하실 내용을 입력해 주세요 :)"
          selectionColor={colors.themeBlue}
          placeholderTextColor={colors.textSecondary}
        />
        <Button
          {...PaperPresets.wideThemedButton}
          disabled={content.length <= 0}
          style={styles.button}>
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
    paddingTop: 12, // paddingVertical은 안되고 paddingTop + paddingBottom은 된다!
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
