import {Expose} from 'class-transformer';

export default class Notice {
  @Expose()
  id: number = 0;

  @Expose()
  title: string = '';

  @Expose()
  body: string = '';

  @Expose({name: 'created-at'})
  createdAt: number = 0;
}
