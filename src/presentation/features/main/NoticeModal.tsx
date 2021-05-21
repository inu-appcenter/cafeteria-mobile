import Modal from 'react-native-modal';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useStores from '../../hooks/useStores';
import {observer} from 'mobx-react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import {Button} from 'react-native-paper';
import PaperPresets from '../../components/utils/PaperPresets';

function NoticeModal() {
  const {noticeStore} = useStores();

  return (
    <Modal
      isVisible={noticeStore.currentNotice !== undefined}
      swipeDirection="down"
      onSwipeComplete={() => noticeStore.dismissCurrentNotice()}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={{
          width: '100%',
          minHeight: 240,
          backgroundColor: colors.white,
          borderRadius: 20,
          justifyContent: 'space-between',
        }}>
        <View style={{paddingHorizontal: 28, paddingVertical: 32}}>
          <Text style={styles.textTitle}>
            {noticeStore.currentNotice?.title}
          </Text>
          <Text style={styles.textBody}>{noticeStore.currentNotice?.body}</Text>
        </View>

        <Button
          {...PaperPresets.wideThemedButton}
          labelStyle={{
            color: 'white',
            fontSize: 16,
            paddingBottom: 34,
          }}
          style={{borderRadius: 0}}
          onPress={() => noticeStore.dismissCurrentNotice()}>
          닫기
        </Button>
      </View>
    </Modal>
  );
}

export default observer(NoticeModal);

const styles = StyleSheet.create({
  textTitle: {
    ...palette.textSubHeader,
  },
  textBody: {
    ...palette.textPrimary,
    marginTop: 16,
  },
});
