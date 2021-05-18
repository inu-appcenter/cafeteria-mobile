import React from 'react';
import HeaderLogo from './List/HeaderLogo';
import {StyleSheet} from 'react-native';
import ReorderScreen from './Reorder/ReorderScreen';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import ReorderHeaderButton from './List/ReorderHeaderButton';
import CafeteriaListScreen from './List/CafeteriaListScreen';
import CafeteriaDetailScreen from './Detail/CafeteriaDetailScreen';
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
        component={CafeteriaListScreen}
        options={({navigation}) => ({
          headerTitle: () => <HeaderLogo />,
          headerStyle: styles.noSeparator,
          headerTitleAlign: 'center',
          headerRight: () => <ReorderHeaderButton navigation={navigation} />,
        })}
      />
      <Stack.Screen name="CafeteriaDetail" component={CafeteriaDetailScreen} />
      <Stack.Screen
        name="CafeteriaReorder"
        component={ReorderScreen}
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
