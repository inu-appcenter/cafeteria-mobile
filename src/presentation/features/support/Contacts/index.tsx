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
