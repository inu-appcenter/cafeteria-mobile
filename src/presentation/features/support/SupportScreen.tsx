import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import Ask from './Ask';
import Main from './Main';
import Notices from './Notices';
import Contacts from './Contacts';
import ServiceHelp from './ServiceHelp';
import FrequentQuestions from './FrequentQuestions';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';

export type SupportNavigationParams = {
  SupportMain: undefined;
  SupportNotices: undefined;
  SupportContacts: undefined;
  SupportServiceHelp: undefined;
  SupportAskAndAnswers: undefined;
  SupportFrequentQuestions: undefined;
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
        name={'SupportMain'}
        component={Main}
        options={{title: '지원'}}
      />
      <Stack.Screen
        name={'SupportContacts'}
        component={Contacts}
        options={{title: '연락처'}}
      />
      <Stack.Screen
        name={'SupportNotices'}
        component={Notices}
        options={{title: '공지'}}
      />
      <Stack.Screen
        name={'SupportAskAndAnswers'}
        component={Ask}
        options={{title: '1:1 문의'}}
      />
      <Stack.Screen
        name={'SupportFrequentQuestions'}
        component={FrequentQuestions}
        options={{title: '자주 묻는 질문'}}
      />
      <Stack.Screen
        name={'SupportServiceHelp'}
        component={ServiceHelp}
        options={{title: '서비스 이용 안내'}}
      />
    </Stack.Navigator>
  );
}
