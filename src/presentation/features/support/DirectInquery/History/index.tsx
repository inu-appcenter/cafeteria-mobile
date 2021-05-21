import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import useApi from '../../../../hooks/useApi';
import useStores from '../../../../hooks/useStores';
import handleApiError from '../../../../../common/utils/handleApiError';
import LoadingView from '../../../../components/LoadingView';

export default function History() {
  const {directInquiryStore} = useStores();

  const [loading, fetch] = useApi(() => directInquiryStore.fetchHistories());

  const fetchHistories = () => {
    fetch().catch(e => handleApiError(e));
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const loadingView = <LoadingView />;

  const content = (
    <FlatList
      data={directInquiryStore.histories}
      renderItem={() => (
        <View>
          <Text>dehuj</Text>
        </View>
      )}
    />
  );

  return loading ? loadingView : content;
}
