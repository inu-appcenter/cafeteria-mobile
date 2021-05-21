import Cafeteria from '../../../domain/entities/Cafeteria';
import Corner from '../../../domain/entities/Corner';
import Menu from '../../../domain/entities/Menu';

export default class MenuView {
  key: string = '';
  cornerName: string = '';
  availableAt: number = 0;
  foodsText: string = '';
  priceAndCalorieText: string = '';

  static fromCafeteriaAndCorner(
    cafeteria: Cafeteria,
    corner: Corner,
  ): MenuView[] {
    const priceAndCalorieString = (menu: Menu) => {
      const {price, calorie} = menu;

      const caloriePart =
        calorie > 0 ? `${Number(calorie).toLocaleString()}kcal` : '';
      const pricePart =
        price > 0 ? `${Number(menu.price).toLocaleString()}원` : '';
      const separatorPart =
        caloriePart.length > 0 && pricePart.length > 0 ? ' · ' : '';

      return caloriePart + separatorPart + pricePart;
    };

    return corner.menus.map((menu, index) => ({
      key: `${cafeteria.id}-${corner.id}-${index}`, // 예시: '1-6-2'
      cornerName: corner.displayName,
      availableAt: corner.availableAt,
      foodsText: menu.foods.join(', '),
      priceAndCalorieText: priceAndCalorieString(menu),
    }));
  }
}
