/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
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

import React, {useEffect} from 'react';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import {FlatList} from 'react-native';
import {observer} from 'mobx-react';
import {StackNavigationProp} from '@react-navigation/stack';
import BookableCafeteriaItem from './BookableCafeteriaItem';
import {BookingNavigationParams} from '../BookingScreen';
import {useApiInContainer} from '../../../hooks/useApi';
import handleApiError from '../../../../common/utils/handleApiError';

type Props = {
  navigation: StackNavigationProp<BookingNavigationParams, 'BookingOptionsList'>;
};

function OptionsList({navigation}: Props) {
  const {cafeteriaStore} = useStores();

  const [Container, data, fetch] = useApiInContainer(
    cafeteriaStore.cafeteria.filter(c => c.supportBooking),
    () => cafeteriaStore.fetchCafeteria(),
  );

  useEffect(() => {
    fetch().catch(handleApiError);
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        style={palette.whiteBackground}
        contentContainerStyle={{paddingBottom: 25}}
        renderItem={i => <BookableCafeteriaItem navigation={navigation} cafeteria={i.item} />}
      />
    </Container>
  );
}

export default observer(OptionsList);
