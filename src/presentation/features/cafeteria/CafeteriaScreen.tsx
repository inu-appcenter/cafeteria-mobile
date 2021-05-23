import List from './List';
import React from 'react';
import Detail from './Detail';
import Reorder from './Reorder';
import HeaderLogo from './List/HeaderLogo';
import {StyleSheet} from 'react-native';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import ReorderHeaderButton from './List/ReorderHeaderButton';
import CafeteriaWithMenuView from './CafeteriaWithMenuView';
import {createStackNavigator} from '@react-navigation/stack';

export type CafeteriaListDetailNavigationParams = {
  CafeteriaList: undefined;
  CafeteriaDetail: {cafeteria: CafeteriaWithMenuView};
  CafeteriaReorder: undefined;
};

export default function CafeteriaScreen() {
  const Stack = createStackNavigator<CafeteriaListDetailNavigationParams>();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name="CafeteriaList"
        component={List}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: styles.noSeparator,
          headerTitleAlign: 'center',
          headerRight: () => <ReorderHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen name="CafeteriaDetail" component={Detail} />
      <Stack.Screen
        name="CafeteriaReorder"
        component={Reorder}
        options={{
          title: '순서 변경',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  noSeparator: {
    shadowColor: 'transparent',
  },
});
