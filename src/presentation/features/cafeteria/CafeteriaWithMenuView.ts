import MenuView from './MenuView';
import Cafeteria from '../../../domain/entities/Cafeteria';

export default class CafeteriaWithMenuView {
  id: number = 0;
  key: string = '';
  title: string = '';
  menus: MenuView[] = [];

  static fromCafeteria(cafeteria: Cafeteria): CafeteriaWithMenuView {
    return {
      id: cafeteria.id,
      key: `${cafeteria.id}`,
      title: cafeteria.displayName,
      menus: cafeteria.corners
        .map(corner =>
          corner.menus.map((menu, index) => ({
            key: `${cafeteria.id}-${corner.id}-${index}`, // 예시: '1-6-2'
            cornerName: corner.displayName,
            availableAt: corner.availableAt,
            foods: menu.foods,
            price: menu.price,
            calorie: menu.calorie,
          })),
        )
        .flat(),
    };
  }
}
