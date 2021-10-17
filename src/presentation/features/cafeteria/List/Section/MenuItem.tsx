/**
 * This file is part of INU Cafeteria.
 *
 * Copyright (C) 2021 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import palette from '../../../../res/palette';
import MenuView from '../../MenuView';
import Touchable from '../../../../components/Touchable';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const images = [
  null, // 0번 인덱스는 버립니다! 1부터 7까지만 써요.
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
  const [extrasVisible, setExtrasVisible] = useState(false);

  const expand = () => {
    setLines(EXPANDED_MAX_LINES);
    setExtrasVisible(true);
  };

  return (
    <Touchable onPress={() => expand()}>
      <View style={styles.rootContainer}>
        {/* 이용 가능 시간 이미지 */}
        <Image style={styles.availableTimeImage} resizeMode="contain" source={images[menu.availableAt]} />

        {/* 나머지 */}
        <View style={styles.textPartContainer}>
          {/* 메뉴들 */}
          <Text numberOfLines={lines} ellipsizeMode="tail" style={styles.foodsText}>
            {menu.foodsText}
          </Text>

          {/* 상세 정보 */}
          {extrasVisible && menu.hasExtras && <Text style={styles.extrasText}>{menu.extrasText}</Text>}

          {/* 가격과 열량 */}
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
    ...palette.textSubPrimary,
    fontWeight: 'bold',
  },
  extrasText: {
    marginTop: 8,
    ...palette.textSecondary,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metadataText: {
    ...palette.textSecondary,
  },
});
