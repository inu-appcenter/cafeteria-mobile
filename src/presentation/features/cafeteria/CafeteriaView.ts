import Cafeteria from '../../../domain/entities/Cafeteria';

export default class CafeteriaView {
  id: number = 0;
  displayName: string = '';
  supportDiscount: boolean = false;

  static fromCafeteria(cafeteria: Cafeteria): CafeteriaView {
    return {
      id: cafeteria.id,
      displayName: cafeteria.displayName,
      supportDiscount: cafeteria.supportDiscount,
    };
  }
}
