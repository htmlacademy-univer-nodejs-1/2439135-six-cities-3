import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { AuthorEntity } from '../author/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text: string;

  @prop({ required: true })
  public date: Date;

  @prop({ required: true })
  public rayting: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: AuthorEntity,
    required: true,
  })
  public userId: Ref<AuthorEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);