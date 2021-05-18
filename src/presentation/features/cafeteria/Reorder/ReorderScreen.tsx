import React, {useCallback, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import palette from '../../../res/palette';
import {LogBox} from 'react-native';
import useStores from '../../../hooks/useStores';
import useApi from '../../../hooks/useApi';
import CafeteriaView from '../CafeteriaView';
import {observer} from 'mobx-react';

LogBox.ignoreLogs(['ReactNativeFiberHostComponent']);

function ReorderScreen() {
  const {cafeteriaStore} = useStores();
  const [, fetch] = useApi(() => cafeteriaStore.fetchCafeteria());

  useEffect(() => {
    fetch();
  }, []);

  const renderItem = useCallback(
    ({item, index, drag, isActive}: RenderItemParams<CafeteriaView>) => {
      return (
        <TouchableOpacity
          style={{
            height: 100,
            alignItems: 'center',
            opacity: isActive ? 0.5 : 1,
            justifyContent: 'center',
          }}
          delayLongPress={200}
          onLongPress={drag}>
          <View>
            <Text style={palette.textHeader}>{item.displayName}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <DraggableFlatList
      data={cafeteriaStore.cafeteria}
      onDragEnd={({data}) => cafeteriaStore.setOrders(data.map(c => c.id))}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default observer(ReorderScreen);
