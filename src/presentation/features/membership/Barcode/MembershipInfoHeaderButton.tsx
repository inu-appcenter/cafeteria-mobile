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

import Icon from 'react-native-vector-icons/Feather';
import useApi from '../../../hooks/useApi';
import colors from '../../../res/colors';
import {Alert} from 'react-native';
import palette from '../../../res/palette';
import useStores from '../../../hooks/useStores';
import React, {useEffect} from 'react';

export default function MembershipInfoHeaderButton() {
  const {cafeteriaStore} = useStores();
  const [, fetch] = useApi(() => cafeteriaStore.fetchCafeteria());

  useEffect(() => {
    fetch();
  }, []);

  const showAvailableMembershipUsages = async () => {
    const supportedCafeteria = cafeteriaStore.cafeteria
      .filter(c => c.supportDiscount)
      .map(c => c.displayName)
      .join(', ');

    Alert.alert(
      `할인 혜택 안내`,
      `${supportedCafeteria}에서 이용하실 수 있습니다. 할인 제공 여부와 시점은 식당 사정에 따라 달라질 수 있습니다.`,
    );
  };

  return (
    <Icon
      name={'info'}
      size={24}
      color={colors.textPrimary}
      style={palette.iconHeaderButton}
      onPress={showAvailableMembershipUsages}
    />
  );
}
