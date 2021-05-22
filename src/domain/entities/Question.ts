import Answer from './Answer';
import {Expose} from 'class-transformer';

export default class Question {
  @Expose()
  id: number = 0;

  @Expose()
  content: string = '';

  @Expose({name: 'created-at'})
  createdAt: number = 0;

  answer?: Answer = undefined;
}
