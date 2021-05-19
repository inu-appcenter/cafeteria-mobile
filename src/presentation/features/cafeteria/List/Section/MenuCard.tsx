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
        ItemSeparatorComponent={() => (
          <ItemSeparator style={styles.separator} />
        )}
      />
    </CardView>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginStart: 72,
  },
});
