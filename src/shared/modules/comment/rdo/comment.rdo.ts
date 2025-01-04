import { Expose, Type } from 'class-transformer';
import { AuthorRdo } from '../../author/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public rating: number;

  @Expose()
  public text: string;

  @Expose()//{ name: 'createdAt'}
  public date: string;

  @Expose({ name: 'authorId'})
  @Type(() => AuthorRdo)
  public author: AuthorRdo;
}
