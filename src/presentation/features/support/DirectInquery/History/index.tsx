import useApi from '../../../../hooks/useApi';
import palette from '../../../../res/palette';
import useStores from '../../../../hooks/useStores';
import {FlatList} from 'react-native';
import LoadingView from '../../../../components/LoadingView';
import InquiryItem from './InquiryItem';
import ItemSeparator from '../../../../components/ItemSeparator';
import handleApiError from '../../../../../common/utils/handleApiError';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

function History() {
  const {directInquiryStore} = useStores();

  const [loading, fetch] = useApi(() => directInquiryStore.fetchHistories());

  const fetchHistories = () => {
    fetch().catch(handleApiError);
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const loadingView = <LoadingView />;

  const content = (
    <FlatList
      style={palette.whiteBackground}
      data={directInquiryStore.histories}
      renderItem={i => <InquiryItem inquiry={i.item} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );

  return loading ? loadingView : content;
}

export default observer(History);
