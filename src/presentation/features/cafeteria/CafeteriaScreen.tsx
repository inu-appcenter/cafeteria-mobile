import React from 'react';
import HeaderLogo from './HeaderLogo';
import {StyleSheet} from 'react-native';
import CafeteriaView from './CafeteriaView';
import StackHeaderPresets from '../../components/utils/StackHeaderPresets';
import CafeteriaListScreen from './CafeteriaListScreen';
import CafeteriaDetailScreen from './CafeteriaDetailScreen';
import {createStackNavigator} from '@react-navigation/stack';

export type CafeteriaListDetailNavigationParams = {
  List: undefined;
  Detail: {cafeteria: CafeteriaView};
};

export default class CafeteriaScreen extends React.Component {
  render() {
    const Stack = createStackNavigator<CafeteriaListDetailNavigationParams>();

    return (
      <Stack.Navigator
        headerMode="screen"
        screenOptions={StackHeaderPresets.commonHeaderOptions}>
        <Stack.Screen
          name="List"
          component={CafeteriaListScreen}
          options={{
            headerTitle: () => <HeaderLogo />,
            headerTitleAlign: 'center',
            headerStyle: styles.noSeparator,
          }}
        />
        <Stack.Screen name="Detail" component={CafeteriaDetailScreen} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  noSeparator: {
    shadowColor: 'transparent',
  },
});
