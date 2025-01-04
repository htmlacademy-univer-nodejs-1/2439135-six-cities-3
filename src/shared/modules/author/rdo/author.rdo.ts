import { Expose } from 'class-transformer';
import { authorTypeEnum } from '../../../types/offer.js';

export class AuthorRdo {
  @Expose()
  public email: string ;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public authorType: authorTypeEnum.Default | authorTypeEnum.Pro;

  @Expose()
  public id: string;
}
