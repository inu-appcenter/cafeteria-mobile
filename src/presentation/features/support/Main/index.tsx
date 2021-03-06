/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
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

import React from 'react';
import palette from '../../../res/palette';
import Feather from 'react-native-vector-icons/Feather';
import useStores from '../../../hooks/useStores';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';
import useUserState from '../../../hooks/useUserState';
import {logoutAlert} from '../../../components/utils/alert';
import SupportOption from './SupportOption';
import ItemSeparator from '../../../components/ItemSeparator';
import ContactsButton from './ContactsButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SupportMainNavigation} from '../SupportScreen';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  navigation: SupportMainNavigation;
};

function Main({navigation}: Props) {
  const {isLoggedIn} = useUserState();
  const {userStore} = useStores();

  const contacts = <ContactsButton navigation={navigation} />;
  const separator = <ItemSeparator style={{marginVertical: 12}} />;

  const askForLogout = async () => {
    logoutAlert('로그아웃', '로그아웃 하시겠습니까?', async () => {
      await userStore.logout();
    });
  };

  const qnaOption = (
    <SupportOption.Item
      icon={['message-square', Feather]}
      title="1:1 문의"
      navigationDestination="SupportQuestionAndAnswer"
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
      {isLoggedIn && qnaOption}
      <SupportOption.Item
        icon={['archive', Feather]}
        title="자주 묻는 질문"
        navigationDestination="SupportFrequentQuestions"
      />
      <SupportOption.Item
        icon={['ticket-confirmation-outline', MaterialCommunityIcons]}
        title="입장 예약 FAQ"
        navigationDestination="SupportBookingQuestions"
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

  const logout = isLoggedIn && (
    <Text style={styles.logoutButton} onPress={askForLogout}>
      로그아웃
    </Text>
  );

  return (
    <ScrollView style={palette.whiteBackground}>
      <View>
        {contacts}
        {general}
        {separator}
        {support}
        {separator}
        {terms}
        {separator}
        {logout}
      </View>
    </ScrollView>
  );
}

export default observer(Main);

const styles = StyleSheet.create({
  logoutButton: {
    ...palette.textSecondary,
    marginStart: 22,
    textDecorationLine: 'underline',
  },
});
