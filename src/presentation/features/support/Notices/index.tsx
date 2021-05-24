import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {FlatList} from 'react-native';
import NoticeItem from './NoticeItem';
import ItemSeparator from '../../../components/ItemSeparator';
import handleApiError from '../../../../common/utils/handleApiError';
import React, {useEffect} from 'react';
import LoadingView from '../../../components/LoadingView';

export default function Notices() {
  const {noticeStore} = useStores();

  const [loading, fetch] = useApi(() => noticeStore.fetchAllNotices());

  useEffect(() => {
    fetch().catch(handleApiError);
  }, []);

  const loadingView = <LoadingView />;

  const content = (
    <FlatList
      data={noticeStore.notices}
      style={palette.whiteBackground}
      renderItem={i => <NoticeItem notice={i.item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

  return loading ? loadingView : content;
}
