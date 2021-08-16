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

import React from 'react';
import palette from '../../../res/palette';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';
import useUserState from '../../../hooks/useUserState';
import SupportOption from './SupportOption';
import ItemSeparator from '../../../components/ItemSeparator';
import ContactsButton from './ContactsButton';
import {ScrollView, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SupportMainNavigation} from '../SupportScreen';

type Props = {
  navigation: SupportMainNavigation;
};

function Main({navigation}: Props) {
  const {isLoggedIn} = useUserState();

  const contacts = <ContactsButton navigation={navigation} />;
  const separator = <ItemSeparator style={{marginVertical: 12}} />;

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
      {isLoggedIn ? qnaOption : null}
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
      <View>
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
