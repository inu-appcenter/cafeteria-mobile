import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {inject, observer} from 'mobx-react';
import RootStore from '../../../store/RootStore';
import MembershipStore from './MembershipStore';
import palette from '../../res/palette';
import colors from '../../res/colors';
import {Button, TextInput} from 'react-native-paper';
import PaperPresets from '../../components/utils/PaperPresets';
import GlobalStore from '../../../store/GlobalStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {MembershipNavigationParams} from './MembershipScreen';

type Props = {
  navigation: StackNavigationProp<MembershipNavigationParams, 'Login'>;
  loginStore: MembershipStore;
  globalStore: GlobalStore;
};

@inject(({loginStore, globalStore}: RootStore) => ({loginStore, globalStore}))
@observer
export default class LoginScreen extends React.Component<Props> {
  render() {
    const {navigation, loginStore, globalStore} = this.props;

    return (
      <ScrollView style={[palette.whiteBackground, palette.fullSized]}>
        <TextInput
          {...PaperPresets.commonTextInput}
          style={styles.input}
          returnKeyType="next"
          keyboardType="number-pad"
          label="학번"
          onChangeText={text => loginStore.setIdField(text)}
        />
        <TextInput
          {...PaperPresets.commonTextInput}
          style={styles.input}
          returnKeyType="go"
          secureTextEntry={true}
          label="비밀번호"
          onChangeText={text => loginStore.setPasswordField(text)}
        />
        <Button
          {...PaperPresets.wideButton}
          style={styles.button}
          onPress={() => {
            globalStore.setLoggedIn(true);
            navigation.goBack();
          }}>
          로그인
        </Button>
      </ScrollView>
    );
  }
}

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
