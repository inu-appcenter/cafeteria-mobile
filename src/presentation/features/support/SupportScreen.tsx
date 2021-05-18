import React from 'react';
import SupportMainScreen from './SupportMainScreen';
import SupportNoticeScreen from './SupportNoticeScreen';
import SupportWebViewScreen from './SupportWebViewScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SupportContactsScreen from './SupportContactsScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';

export type SupportNavigationParams = {
  SupportMain: undefined;
  SupportNotice: undefined;
  SupportContacts: undefined;
  SupportWebView: {url: string; headerTitle: string};
};

const Stack = createStackNavigator<SupportNavigationParams>();

export default function SupportScreen() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name={'SupportMain'}
        component={SupportMainScreen}
        options={{title: '지원'}}
      />
      <Stack.Screen
        name={'SupportContacts'}
        component={SupportContactsScreen}
        options={{title: '연락처'}}
      />
      <Stack.Screen
        name={'SupportNotice'}
        component={SupportNoticeScreen}
        options={{title: '공지'}}
      />
      <Stack.Screen name={'SupportWebView'} component={SupportWebViewScreen} />
    </Stack.Navigator>
  );
}
