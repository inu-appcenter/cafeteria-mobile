import {Expose} from 'class-transformer';

export default class Answer {
  @Expose()
  id: number = 0;

  @Expose()
  title: string = '';

  @Expose()
  body: string = '';

  @Expose()
  read: boolean = false;

  @Expose({name: 'created-at'})
  createdAt: number = 0;
}
