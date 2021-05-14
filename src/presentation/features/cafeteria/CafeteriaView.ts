import MenuView from './MenuView';
import Cafeteria from '../../../data/entities/Cafeteria';

export default class CafeteriaView {
  key: string = '';
  title: string = '';
  menus: MenuView[] = [];

  static fromCafeteria(cafeteria: Cafeteria): CafeteriaView {
    return {
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
