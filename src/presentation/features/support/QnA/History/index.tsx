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

import {useApiInContainer} from '../../../../hooks/useApi';
import palette from '../../../../res/palette';
import useStores from '../../../../hooks/useStores';
import {FlatList} from 'react-native';
import QnAItem from './QnAItem';
import ItemSeparator from '../../../../components/ItemSeparator';
import handleApiError from '../../../../../common/utils/handleApiError';
import React, {useEffect} from 'react';
import {observer} from 'mobx-react';

function History() {
  const {qnaStore} = useStores();

  const [Container, data, fetch] = useApiInContainer(qnaStore.histories, () => qnaStore.fetchHistories());

  useEffect(() => {
    fetch().catch(handleApiError);
  }, []);

  return (
    <Container>
      <FlatList
        style={palette.whiteBackground}
        data={data}
        renderItem={i => <QnAItem qna={i.item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Container>
  );
}

export default observer(History);
