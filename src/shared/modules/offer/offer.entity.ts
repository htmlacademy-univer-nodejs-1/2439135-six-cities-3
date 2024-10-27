import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {City, facilitiesEnum, HousingType, Facilities, housingTypes, citys} from '../../types/index.js';
import { AuthorEntity } from '../author/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date!: Date;

  @prop({
    type: () => String,
    enum: citys
  })
  public city!: City;

  @prop()
  public preview!: string;

  @prop({
    required: true,
    type: () => String,
  })
  public photos!: string[];

  @prop()
  public isPremium!: boolean;

  @prop()
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: housingTypes
  })
  public housingType!: HousingType;

  @prop()
  public roomsCount!: number;

  @prop()
  public guestsCount!: number;

  @prop()
  public price!: number;

  @prop({
    type: () => String
    //type: mongoose.Schema.Types.Mixed
  })
  public coordinates!: string;

  @prop({
    type: () => String,
    enum: facilitiesEnum
  })
  public facilities!: Facilities[];

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    ref: AuthorEntity,
    required: true
  })
  public authorId!: Ref<AuthorEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
