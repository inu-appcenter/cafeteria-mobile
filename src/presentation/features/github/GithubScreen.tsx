import colors from '../../res/colors';
import React from 'react';
import BackIcon from '../../components/BackIcon';
import ListScreen from './ListScreen';
import DetailScreen from './DetailScreen';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import {Image, Platform, StyleSheet} from 'react-native';
import {GithubProfileSectionItem} from './GitHubProfileData';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

export type GithubProfileParamList = {
  List: undefined;
  Detail: {section: GithubProfileSectionItem};
};

export default class GithubScreen extends React.Component {
  render() {
    const Stack = createStackNavigator<GithubProfileParamList>();

    const screenOptions: StackHeaderOptions = {
      headerBackTitleVisible: false,
      headerTitleStyle: styles.boldText,
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
          component={ListScreen}
          options={{
            headerTitle: () => (
              <Image
                resizeMode="center"
                source={require('../../../../images/header_logo.png')}
              />
            ),
            headerTitleAlign: 'center',
            headerStyle: styles.noSeparator,
          }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  noSeparator: {
    shadowColor: 'transparent',
  },
  boldText: {
    fontWeight: 'bold',
  },
});
