import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import {LogBox} from 'react-native';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import CafeteriaView from '../CafeteriaView';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import React, {useCallback, useEffect} from 'react';

import ReorderableRow from './ReorderableRow';
import ItemSeparator from '../../../components/ItemSeparator';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);

function ReorderScreen() {
  const {cafeteriaStore} = useStores();
  const [, fetch] = useApi(() => cafeteriaStore.fetchCafeteria());

  useEffect(() => {
    fetch();
  }, []);

  const renderItem = useCallback(
    (params: RenderItemParams<CafeteriaView>) => <ReorderableRow {...params} />,
    [],
  );

  return (
    <DraggableFlatList
      style={palette.whiteBackground}
      data={cafeteriaStore.cafeteria}
      onDragEnd={({data}) => cafeteriaStore.setOrders(data.map(c => c.id))}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default observer(ReorderScreen);
