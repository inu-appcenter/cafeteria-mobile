import React from 'react';
import palette from '../../../res/palette';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';
import useUserState from '../../../hooks/useUserState';
import SupportOption from './SupportOption';
import ItemSeparator from '../../../components/ItemSeparator';
import ContactsButton from './ContactsButton';
import {SupportMainNavigation} from '../SupportScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, StyleSheet, View} from 'react-native';

type Props = {
  navigation: SupportMainNavigation;
};

function Main({navigation}: Props) {
  const {isLoggedIn} = useUserState();

  const contacts = <ContactsButton navigation={navigation} />;
  const separator = <ItemSeparator style={{marginVertical: 12}} />;

  const directInquiryOption = (
    <SupportOption.Item
      icon={['message-square', Feather]}
      title="1:1 문의"
      navigationDestination="SupportDirectInquiry"
    />
  );

  const general = (
    <SupportOption.Section navigation={navigation}>
      <SupportOption.Item
        icon={['notification', AntDesign]}
        title="공지"
        navigationDestination="SupportNotices"
      />
      <SupportOption.Item
        icon={['code-braces', MaterialCommunityIcons]}
        title="버전"
        navigationDestination="SupportVersion"
      />
    </SupportOption.Section>
  );

  const support = (
    <SupportOption.Section navigation={navigation}>
      {isLoggedIn ? directInquiryOption : null}
      <SupportOption.Item
        icon={['archive', Feather]}
        title="자주 묻는 질문"
        navigationDestination="SupportFrequentQuestions"
      />
      <SupportOption.Item
        icon={['help-circle', Feather]}
        title="서비스 이용 안내"
        navigationDestination="SupportServiceManual"
      />
    </SupportOption.Section>
  );

  const terms = (
    <SupportOption.Section navigation={navigation}>
      <SupportOption.Item
        icon={['file-text', Feather]}
        title="개인정보처리방침"
        navigationDestination="SupportTermsAndConditions"
      />
      <SupportOption.Item
        icon={['info', Feather]}
        title="오픈소스 라이선스"
        navigationDestination="SupportOpenSourceLicenses"
      />
    </SupportOption.Section>
  );

  return (
    <ScrollView style={palette.whiteBackground}>
      <View style={styles.container}>
        {contacts}
        {general}
        {separator}
        {support}
        {separator}
        {terms}
        {separator}
      </View>
    </ScrollView>
  );
}

export default observer(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
