import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import {LogBox} from 'react-native';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import ItemSeparator from '../../../components/ItemSeparator';
import CafeteriaView from '../CafeteriaView';
import ReorderableRow from './ReorderableRow';
import React, {useCallback, useEffect} from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);

function Reorder() {
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

export default observer(Reorder);
