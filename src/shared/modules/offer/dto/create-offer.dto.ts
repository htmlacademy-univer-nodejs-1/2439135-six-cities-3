import {City, Facilities, HousingType} from '../../../types/index.js';

export class CreateOfferDto {
  public name!: string;
  public description!: string;
  public date!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public roomsCount!: number;
  public guestsCount!: number;
  public price!: number;
  public facilities!: Facilities[];
  public authorId!: string;
  public commentsCount!: number;
  public coordinates!: string;
}
