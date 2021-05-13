import {Dimensions, ViewStyle} from 'react-native';

type CreateIndicatorStyleConfig = {
  numberOfTabs: number;
  marginHorizontal: number;
};

export default function createIndicatorStyle(
  options: CreateIndicatorStyleConfig,
): ViewStyle {
  const screenWidth = Dimensions.get('window').width;
  const tabWidth = screenWidth / options.numberOfTabs;

  return {
    marginStart: options.marginHorizontal,
    width: tabWidth - 2 * options.marginHorizontal,
  };
}
