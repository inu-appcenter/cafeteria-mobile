import React from 'react';
import palette from '../../../res/palette';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SupportOption from './SupportOption';
import ItemSeparator from '../../../components/ItemSeparator';
import ContactsButton from './ContactsButton';
import {SupportMainNavigation} from '../SupportScreen';
import {ScrollView, StyleSheet, View} from 'react-native';

type Props = {
  navigation: SupportMainNavigation;
};

export default function Main({navigation}: Props) {
  const contacts = <ContactsButton navigation={navigation} />;
  const separator = <ItemSeparator style={{marginVertical: 12}} />;

  const generalSupportOptions = (
    <SupportOption.Section navigation={navigation}>
      <SupportOption.Item
        icon={['notification', AntDesign]}
        title="공지"
        navigationDestination="SupportNotices"
      />
      <SupportOption.Item
        icon={['message-square', Feather]}
        title="1:1 문의"
        navigationDestination="SupportAskAndAnswers"
      />
      <SupportOption.Item
        icon={['archive', Feather]}
        title="자주 묻는 질문"
        navigationDestination="SupportFrequentQuestions"
      />
    </SupportOption.Section>
  );

  const termsAndServices = (
    <SupportOption.Section navigation={navigation}>
      <SupportOption.Item
        icon={['info', Feather]}
        title="서비스 이용 안내"
        navigationDestination="SupportServiceManual"
      />
      <SupportOption.Item
        icon={['file-text', Feather]}
        title="개인정보처리방침"
        navigationDestination="SupportTermsAndConditions"
      />
    </SupportOption.Section>
  );

  return (
    <ScrollView style={palette.whiteBackground}>
      <View style={styles.container}>
        {contacts}
        {generalSupportOptions}
        {separator}
        {termsAndServices}
        {separator}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
