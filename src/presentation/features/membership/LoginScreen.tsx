import colors from '../../res/colors';
import notify from '../../components/utils/notify';
import palette from '../../res/palette';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../components/utils/PaperPresets';
import Unauthorized from '../../../data/exceptions/Unauthorized';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import ClearableTextInput from '../../components/ClearableTextInput';

function LoginScreen() {
  const {userStore} = useStores();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const formValid = () => {
    return id.length > 0 && password.length > 0;
  };

  const login = async () => {
    if (!formValid()) {
      return;
    }

    try {
      await userStore.login(id, password);
    } catch (e) {
      if (e instanceof Unauthorized) {
        notify('로그인에 실패하였습니다. 학번과 비밀번호를 확인해 주세요 :)');
      } else {
        notify(e.message);
      }
    }
  };

  return (
    <View style={[palette.fullSized, palette.whiteBackground]}>
      <ScrollView contentContainerStyle={palette.horizontalSpace}>
        <ClearableTextInput
          {...PaperPresets.idTextInput}
          style={styles.input}
          value={id}
          label="학번"
          onChangeText={text => setId(text)}
        />
        <ClearableTextInput
          {...PaperPresets.passwordTextInput}
          style={styles.input}
          value={password}
          label="비밀번호"
          right={
            <TextInput.Icon
              onPress={() => notify('yeah')}
              name={'close'}
              color={colors.textSecondary}
            />
          }
          onChangeText={text => setPassword(text)}
        />
        <Button
          loading={userStore.loading}
          {...PaperPresets.wideButton}
          style={styles.button}
          disabled={!formValid()}
          onPress={login}>
          로그인
        </Button>
        <Text style={styles.text}>
          입력하신 개인정보는 암호화되어 전송되며, 본교 재학 여부를 판단하는
          데에 사용된 후 즉시 폐기됩니다.
        </Text>
      </ScrollView>
    </View>
  );
}

export default observer(LoginScreen);

const styles = StyleSheet.create({
  input: {
    marginTop: 12,
    backgroundColor: colors.white,
    paddingVertical: 0,
  },
  button: {
    marginTop: 16,
  },
  text: {
    ...palette.textTertiary,
    marginTop: 8,
  },
});
