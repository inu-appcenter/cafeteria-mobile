import React from 'react';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {FlatList} from 'react-native';
import NoticeItem from './NoticeItem';
import ItemSeparator from '../../../components/ItemSeparator';

export default function Notices() {
  const {noticeStore} = useStores();

  // 공지는 스토어 생성 시점에 로드되기 때문에 여기서 따로 로드할 필요가 없습니다.

  return (
    <FlatList
      style={palette.whiteBackground}
      data={noticeStore.notices}
      renderItem={i => <NoticeItem notice={i.item} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
}
