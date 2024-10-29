import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { Author } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface AuthorEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'authors'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class AuthorEntity extends defaultClasses.TimeStamps implements Author {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: false, default: '' })
  public email: string;

  @prop({ required: true, default: '' })
  public password: string;

  @prop({ required: true, default: 'обычный' })
  public authorType: 'обычный' | 'pro';

  @prop({ required: false, default: '' })
  public avatar?: string;

  constructor(authorData: Author) {
    super();
    this.name = authorData.name;
    this.email = authorData.email;
    this.authorType = authorData.authorType;
    this.avatar = authorData.avatar;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const AuthorModel = getModelForClass(AuthorEntity);
