import React from 'react';
import ListPage from './ListPage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import palette from '../../res/palette';

export default class ListScreen extends React.Component {
  render() {
    const Tab = createMaterialTopTabNavigator();

    return (
      <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          labelStyle: {},
          style: palette.shadowedTopBar,
        }}>
        <Tab.Screen name="오늘" component={ListPage} />
        <Tab.Screen name="내일" component={ListPage} />
        <Tab.Screen name="모레" component={ListPage} />
        <Tab.Screen name="글피" component={ListPage} />
        <Tab.Screen name="그글피" component={ListPage} />
      </Tab.Navigator>
    );
  }
}
