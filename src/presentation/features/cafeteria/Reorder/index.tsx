/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import useApi from '../../../hooks/useApi';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {observer} from 'mobx-react';
import ItemSeparator from '../../../components/ItemSeparator';
import CafeteriaView from '../CafeteriaView';
import ReorderableRow from './ReorderableRow';
import React, {useCallback, useEffect} from 'react';
import DraggableFlatList, {RenderItemParams} from 'react-native-draggable-flatlist';

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
