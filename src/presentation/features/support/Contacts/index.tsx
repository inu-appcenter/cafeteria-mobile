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
import Config from '../../../../common/Config';
import palette from '../../../res/palette';
import ContactItem from './ContactItem';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';

export default function Contacts() {
  const urlOpener = (url: string) => () => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={palette.whiteBackground}>
      <View style={styles.container}>
        <ContactItem
          imageSource={require('../../../res/images/uicoop_logo.png')}
          title="소비자생활협동조합"
          body={'소비자생활협동조합에 문의하시면\n도움을 받으실 수 있습니다.'}
          buttonText="전화하기"
          action={urlOpener(`tel:${Config.contacts.uicoopPhoneNumber}`)}
        />
        <ContactItem
          imageSource={require('../../../res/images/potato.png')}
          title="서비스 관리자"
          body={
            '대부분의 문제는 서비스 개발자/관리자에게\n직접 문의하시면 빠르게 해결됩니다.'
          }
          buttonText="전화하기"
          action={urlOpener(`tel:${Config.contacts.serviceAdminPhoneNumber}`)}
        />
        <ContactItem
          imageSource={require('../../../res/images/inu_appcenter.png')}
          title="앱센터"
          body={
            '카페테리아 서비스에 대해 궁금하신 사항은\n카카오톡 앱센터 채널로 문의 주시면\n답변드리겠습니다.'
          }
          buttonText="카카오톡에서 열기"
          action={urlOpener(`${Config.contacts.inuAppcenterKakaoTalkUrl}`)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 40,
  },
});
