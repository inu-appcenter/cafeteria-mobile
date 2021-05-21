import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import useApi from '../../../hooks/useApi';
import GetAllNotices from '../../../../domain/usecases/GetAllNotices';
import handleApiError from '../../../../common/utils/handleApiError';
import LoadingView from '../../../components/LoadingView';
import useStores from '../../../hooks/useStores';
import NoticeItem from './NoticeItem';
import ItemSeparator from '../../../components/ItemSeparator';
import palette from '../../../res/palette';

export default function Notices() {
  const {noticeStore} = useStores();
  const [loading, fetch] = useApi(() => noticeStore.fetch());

  const fetchNotices = () => {
    fetch().catch(e => handleApiError(e));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const loadingView = <LoadingView />;

  const contents = (
    <FlatList
      style={palette.whiteBackground}
      data={noticeStore.notices}
      renderItem={i => <NoticeItem notice={i.item} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );

  return loading ? loadingView : contents;
}
