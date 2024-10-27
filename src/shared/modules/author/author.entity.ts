import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import {Author, authorTypeEnum} from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AuthorEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AuthorEntity extends defaultClasses.TimeStamps implements Author {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public name: string;

  @prop({ required: true, default: '' })
  public avatar?: string;

  @prop({ required: true, enum: authorTypeEnum })
  public authorType: authorTypeEnum.Default | authorTypeEnum.Pro;

  @prop({required: false, default: 'test'})
  private password?: string;

  constructor(authorData: Author) {
    super();

    this.email = authorData.email;
    this.name = authorData.name;
    this.avatar = authorData.avatar;
    this.authorType = authorData.authorType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const AuthorModel = getModelForClass(AuthorEntity);
