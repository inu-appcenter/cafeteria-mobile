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

import React from 'react';
import {SupportMainNavigation} from '../../SupportScreen';
import {ScrollView, StyleSheet, ViewProps} from 'react-native';

type Props = ViewProps & {
  children: React.ReactNode[] | React.ReactNode;
  navigation: SupportMainNavigation;
};

export default function Section({style, children, navigation}: Props) {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {navigation});
    }

    return child;
  });

  return (
    <ScrollView style={[styles.horizontallyFull, style]}>
      {childrenWithProps}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontallyFull: {
    alignSelf: 'stretch',
  },
});
