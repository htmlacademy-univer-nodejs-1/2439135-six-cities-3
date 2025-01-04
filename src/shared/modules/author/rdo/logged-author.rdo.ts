import { Expose } from 'class-transformer';
import {authorTypeEnum} from "../../../types/index.js";

export class LoggedAuthorRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public name: string;

  @Expose()
  public authorType: authorTypeEnum.Default | authorTypeEnum.Pro;
}
