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

import React from 'react';
import MenuView from '../../MenuView';
import CardView from '../../../../components/CardView';
import MenuItem from './MenuItem';
import ItemSeparator from '../../../../components/ItemSeparator';
import {FlatList, StyleSheet} from 'react-native';

type Props = {
  menus: MenuView[];
};

export default function MenuCard({menus}: Props) {
  return (
    <CardView>
      <FlatList
        data={menus}
        bounces={false}
        listKey={menus[0].key}
        renderItem={i => <MenuItem menu={i.item} />}
        keyExtractor={i => i.key}
        ItemSeparatorComponent={() => <ItemSeparator style={styles.separator} />}
      />
    </CardView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginStart: 72,
  },
});
