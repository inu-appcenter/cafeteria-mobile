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
        .map(corner => MenuView.fromCafeteriaAndCorner(cafeteria, corner))
        .flat(),
    };
  }
}
