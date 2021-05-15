import React from 'react';
import MenuView from '../MenuView';
import CardView from '../../../components/CardView';
import MenuItem from './MenuItem';
import {FlatList} from 'react-native';
import ItemSeparator from '../../../components/ItemSeparator';

type Props = {
  menus: MenuView[];
};

export default function MenuCard({menus}: Props) {
  return (
    <CardView>
      <FlatList
        bounces={false}
        data={menus}
        listKey={menus[0].key}
        renderItem={i => <MenuItem menu={i.item} />}
        keyExtractor={i => i.key}
        ItemSeparatorComponent={ItemSeparator}
      />
    </CardView>
  );
}
