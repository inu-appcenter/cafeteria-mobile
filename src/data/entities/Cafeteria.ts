import Corner from './Corner';
import {Expose} from 'class-transformer';

export default class Cafeteria {
  @Expose()
  id: number = 0;

  @Expose()
  name: string = '';

  @Expose({name: 'display-name'})
  displayName: string = '';

  @Expose({name: 'support-menu'})
  supportMenu: boolean = false;

  @Expose({name: 'support-discount'})
  supportDiscount: boolean = false;

  @Expose({name: 'support-notification'})
  supportNotification: boolean = false;

  corners: Corner[] = [];
}
