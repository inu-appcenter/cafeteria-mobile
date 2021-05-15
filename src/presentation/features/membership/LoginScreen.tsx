import palette from '../../res/palette';
import colors from '../../res/colors';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import PaperPresets from '../../components/utils/PaperPresets';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView, StyleSheet} from 'react-native';
import {MembershipNavigationParams} from './MembershipScreen';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'Login'>;
};

function LoginScreen(props: Props) {
  const {navigation} = props;
  const {globalStore} = useStores();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const formValid = () => {
    return id.length > 0 && password.length > 0;
  };

  return (
    <ScrollView style={[palette.whiteBackground, palette.fullSized]}>
      <TextInput
        {...PaperPresets.commonTextInput}
        style={styles.input}
        returnKeyType="next"
        keyboardType="number-pad"
        label="학번"
        onChangeText={text => setId(text)}
      />
      <TextInput
        {...PaperPresets.commonTextInput}
        style={styles.input}
        returnKeyType="go"
        secureTextEntry={true}
        label="비밀번호"
        onChangeText={text => setPassword(text)}
      />
      <Button
        {...PaperPresets.wideButton}
        style={styles.button}
        disabled={!formValid}
        onPress={() => {
          globalStore.setLoggedIn(true);
          navigation.goBack();
        }}>
        로그인
      </Button>
    </ScrollView>
  );
}

export default observer(LoginScreen);

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 12,
    marginTop: 12,
    backgroundColor: colors.white,
    paddingVertical: 0,
  },
  button: {
    marginHorizontal: 12,
    marginTop: 16,
  },
});
