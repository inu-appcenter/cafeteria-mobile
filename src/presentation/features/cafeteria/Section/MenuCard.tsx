import React from 'react';
import MenuView from '../MenuView';
import CardView from '../../../components/CardView';
import {FlatList} from 'react-native';
import MenuItem from './MenuItem';
import ItemSeparator from '../../../components/ItemSeparator';

type Props = {
  menus: MenuView[];
};

export default class MenuCard extends React.Component<Props> {
  render() {
    const {menus} = this.props;

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
}
