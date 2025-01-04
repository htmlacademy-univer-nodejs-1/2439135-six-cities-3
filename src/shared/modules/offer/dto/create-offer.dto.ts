import {citys, housingTypes, City, Facilities, HousingType} from '../../../types/index.js';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.name.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.name.maxLength})
  public name!: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description!: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.date.invalidFormat})
  public date!: Date;

  @IsEnum(citys, {message: CreateOfferValidationMessage.city.invalid})
  public city!: City;

  @MaxLength(256, {message: CreateOfferValidationMessage.preview.maxLength})
  public preview!: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalid})
  @MaxLength(256, {each: true, message: CreateOfferValidationMessage.photos.maxLength})
  public photos!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalid})
  public isPremium!: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalid})
  public isFavorite!: boolean;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating!:number;

  @IsEnum(housingTypes, {message: CreateOfferValidationMessage.housingType.invalid})
  public housingType!: HousingType;

  @IsInt({message: CreateOfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsCount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomsCount.maxValue})
  public roomsCount!: number;

  @IsInt({message: CreateOfferValidationMessage.guestsCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestsCount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestsCount.maxValue})
  public guestsCount!: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price!: number;

  @IsArray({message: CreateOfferValidationMessage.facilities.invalidFormat})
  @IsEnum(housingTypes, {each: true, message: CreateOfferValidationMessage.facilities.invalid})
  public facilities!: Facilities[];

  @IsInt()
  public commentsCount!: number;

  public authorId: string;

  @MinLength(10, {message: CreateOfferValidationMessage.coordinates.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.coordinates.maxLength})
  public coordinates!: string;
}
