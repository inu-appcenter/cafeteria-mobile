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

import Cafeteria from '../../../domain/entities/Cafeteria';
import Corner from '../../../domain/entities/Corner';
import Menu from '../../../domain/entities/Menu';

export default class MenuView {
  key: string;
  cornerName: string;
  availableAt: number;
  foodsText: string;
  priceAndCalorieText: string;
  hasExtras: boolean;
  extrasText: string;

  static fromCafeteriaAndCorner(cafeteria: Cafeteria, corner: Corner): MenuView[] {
    const priceAndCalorieString = (menu: Menu) => {
      const {price, calorie} = menu;

      const caloriePart = calorie > 0 ? `${Number(calorie).toLocaleString()}kcal` : '';
      const pricePart = price > 0 ? `${Number(menu.price).toLocaleString()}원` : '';
      const separatorPart = caloriePart.length > 0 && pricePart.length > 0 ? ' · ' : '';

      return caloriePart + separatorPart + pricePart;
    };

    return corner.menus.map((menu, index) => ({
      key: `${cafeteria.id}-${corner.id}-${index}`, // 예시: '1-6-2'
      cornerName: corner.displayName,
      availableAt: corner.availableAt,
      foodsText: menu.foods.join(', '),
      priceAndCalorieText: priceAndCalorieString(menu),
      hasExtras: menu.extras.length > 0,
      extrasText: menu.extras.map(extra => `• ${extra}`).join('\n'),
    }));
  }
}
