import {Expose} from 'class-transformer';
import Menu from './Menu';

export default class Corner {
  @Expose()
  id: number = 0;

  @Expose()
  name: string = '';

  @Expose({name: 'display-name'})
  displayName: string = '';

  @Expose({name: 'available-at'})
  availableAt: number = 0;

  menus: Menu[] = [];
}
