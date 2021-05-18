import React from 'react';
import HeaderLogo from './List/HeaderLogo';
import {StyleSheet} from 'react-native';
import ReorderScreen from './Reorder/ReorderScreen';
import CafeteriaWithMenuView from './CafeteriaWithMenuView';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import ReorderHeaderButton from './Reorder/ReorderHeaderButton';
import CafeteriaListScreen from './List/CafeteriaListScreen';
import CafeteriaDetailScreen from './Detail/CafeteriaDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type CafeteriaListDetailNavigationParams = {
  List: undefined;
  Detail: {cafeteria: CafeteriaWithMenuView};
  Reorder: undefined;
};

export default function CafeteriaScreen() {
  const Stack = createStackNavigator<CafeteriaListDetailNavigationParams>();

  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={StackHeaderPresets.commonStackHeaderOptions}>
      <Stack.Screen
        name="List"
        component={CafeteriaListScreen}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: styles.noSeparator,
          headerTitleAlign: 'center',
          headerRight: () => <ReorderHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen name="Detail" component={CafeteriaDetailScreen} />
      <Stack.Screen name="Reorder" component={ReorderScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  noSeparator: {
    shadowColor: 'transparent',
  },
});
