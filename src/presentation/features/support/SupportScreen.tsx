import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Main from './Main';
import Notices from './Notices';
import Contacts from './Contacts';
import ServiceHelp from './ServiceManual';
import DirectInquiry from './DirectInquery';
import FrequentQuestions from './FrequentQuestions';
import TermsAndConditions from './TermsAndConditions';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import OpenSourceLicenses from './OpenSourceLicenses';

export type SupportNavigationParams = {
  SupportMain: undefined;
  SupportNotices: undefined;
  SupportContacts: undefined;
  SupportServiceManual: undefined;
  SupportDirectInquiry: undefined;
  SupportFrequentQuestions: undefined;
  SupportTermsAndConditions: undefined;
  SupportOpenSourceLicenses: undefined;
};

export type SupportMainNavigation = StackNavigationProp<
  SupportNavigationParams,
  'SupportMain'
>;

const Stack = createStackNavigator<SupportNavigationParams>();

export default function SupportScreen() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name="SupportMain"
        component={Main}
        options={{title: '지원'}}
      />
      <Stack.Screen
        name="SupportContacts"
        component={Contacts}
        options={{title: '문의 연락처'}}
      />
      <Stack.Screen
        name="SupportNotices"
        component={Notices}
        options={{title: '공지'}}
      />
      <Stack.Screen
        name="SupportDirectInquiry"
        component={DirectInquiry}
        options={{title: '1:1 문의'}}
      />
      <Stack.Screen
        name="SupportFrequentQuestions"
        component={FrequentQuestions}
        options={{title: '자주 묻는 질문'}}
      />
      <Stack.Screen
        name="SupportServiceManual"
        component={ServiceHelp}
        options={{title: '서비스 이용 안내'}}
      />
      <Stack.Screen
        name="SupportTermsAndConditions"
        component={TermsAndConditions}
        options={{title: '개인정보처리방침'}}
      />
      <Stack.Screen
        name="SupportOpenSourceLicenses"
        component={OpenSourceLicenses}
        options={{title: '오픈소스 라이선스'}}
      />
    </Stack.Navigator>
  );
}
