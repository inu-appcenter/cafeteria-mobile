import React from 'react';
import {View} from 'react-native';
import palette from '../../res/palette';
import {observer} from 'mobx-react';
import MainNavigator from './MainNavigator';
import NoticeModal from './NoticeModal';

function Main() {
  return (
    <View style={palette.fullSized}>
      <MainNavigator />
      <NoticeModal />
    </View>
  );
}

export default observer(Main);
