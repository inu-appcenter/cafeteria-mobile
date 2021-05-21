import colors from '../../../../res/colors';
import MenuView from '../../MenuView';
import Touchable from '../../../../components/Touchable';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const images = [
  null,
  require('../../../../res/images/available_1.png'),
  require('../../../../res/images/available_2.png'),
  require('../../../../res/images/available_3.png'),
  require('../../../../res/images/available_4.png'),
  require('../../../../res/images/available_5.png'),
  require('../../../../res/images/available_6.png'),
  require('../../../../res/images/available_7.png'),
];

type Props = {
  menu: MenuView;
};

export default function MenuItem({menu}: Props) {
  const COLLAPSED_MAX_LINES = 2;
  const EXPANDED_MAX_LINES = 5;

  const [lines, setLines] = useState(COLLAPSED_MAX_LINES);

  return (
    <Touchable onPress={() => setLines(EXPANDED_MAX_LINES)}>
      {/* Root */}
      <View style={styles.rootContainer}>
        {/* Available time view */}
        <Image
          style={styles.availableTimeImage}
          resizeMode="contain"
          source={images[menu.availableAt]}
        />

        {/* The rest */}
        <View style={styles.textPartContainer}>
          {/* Foods */}
          <Text
            numberOfLines={lines}
            ellipsizeMode={'tail'}
            style={styles.foodsText}>
            {menu.foodsText}
          </Text>

          {/* Price and calorie */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.metadataText}>{menu.cornerName}</Text>
            <Text style={styles.metadataText}>{menu.priceAndCalorieText}</Text>
          </View>
        </View>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
  },

  availableTimeImage: {
    width: 50,
    height: 50,
  },

  textPartContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginStart: 12,
  },

  foodsText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  metadataText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
