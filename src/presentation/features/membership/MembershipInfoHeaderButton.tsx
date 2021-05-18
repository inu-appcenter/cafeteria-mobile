import Icon from 'react-native-vector-icons/Feather';
import React from 'react';
import colors from '../../res/colors';
import {Alert} from 'react-native';
import palette from '../../res/palette';
import GetCafeteriaOnly from '../../../domain/usecases/GetCafeteriaOnly';

export default function MembershipInfoHeaderButton() {
  const showAvailableMembershipUsages = async () => {
    const supportedCafeteria = (await GetCafeteriaOnly.run())
      .filter(c => c.supportDiscount)
      .map(c => c.displayName)
      .join(', ');

    Alert.alert(
      `할인 혜택 안내`,
      `${supportedCafeteria}에서 이용하실 수 있습니다. 할인 제공 여부와 시점은 식당 사정에 따라 달라질 수 있습니다.`,
    );
  };

  return (
    <Icon
      name={'info'}
      size={24}
      color={colors.textPrimary}
      style={palette.iconHeaderButton}
      onPress={showAvailableMembershipUsages}
    />
  );
}
