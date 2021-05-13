import React from 'react';
import colors from '../../res/colors';
import palette from '../../res/palette';
import BackIcon from '../../components/BackIcon';
import CafeteriaListScreen from './CafeteriaListScreen';
import CafeteriaDetailScreen from './CafeteriaDetailScreen';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {Image, Platform, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import CafeteriaView from './CafeteriaView';

export type CafeteriaNavigationParams = {
  List: undefined;
  Detail: {cafeteria: CafeteriaView};
};

export default class CafeteriaScreen extends React.Component {
  render() {
    const Stack = createStackNavigator<CafeteriaNavigationParams>();

    const screenOptions: StackHeaderOptions = {
      headerBackTitleVisible: false,
      headerTitleStyle: palette.boldText,
      headerTintColor: colors.textPrimary,
      headerLeftContainerStyle: {
        left: Platform.OS === 'ios' ? 12 : 0,
      },
      headerBackImage: () => <BackIcon />,
      ...TransitionPresets.SlideFromRightIOS,
    };

    return (
      <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
        <Stack.Screen
          name="List"
          component={CafeteriaListScreen}
          options={{
            headerTitle: () => (
              <Image
                style={styles.headerLogo}
                resizeMode="contain"
                source={require('../../res/images/header_logo.png')}
              />
            ),
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
  headerLogo: {
    height: 17,
  },
});
