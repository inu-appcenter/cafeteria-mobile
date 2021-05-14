import {Expose, Type} from 'class-transformer';

export default class Menu {
  @Expose()
  @Type(() => String)
  foods: string[] = [];

  @Expose()
  price: number = 0;

  @Expose()
  calorie: number = 0;
}
