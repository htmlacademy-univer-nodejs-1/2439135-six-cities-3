import { Expose } from 'class-transformer';
import { City, HousingType, Facilities, Author } from '../../../types/offer.js';

export class OfferRdo {
  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public date: Date;

  @Expose()
  public city: City;

  @Expose()
  public preview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public roomsCount:number;

  @Expose()
  public guestsCount: number;

  @Expose()
  public price: number;

  @Expose()
  public facilities: Facilities[];

  @Expose()
  public author: Author;

  @Expose()
  public commentsCount: number;

  @Expose()
  public coordinates: string;
}
