import {City, citys, Facilities, HousingType, housingTypes} from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber, IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: CreateOfferValidationMessage.name.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.name.maxLength})
  public name!: string;

  @IsOptional()
  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: CreateOfferValidationMessage.date.invalidFormat})
  public date!: Date;

  @IsOptional()
  @IsEnum(citys, {message: CreateOfferValidationMessage.city.invalid})
  public city!: City;

  @IsOptional()
  @MaxLength(256, {message: CreateOfferValidationMessage.preview.maxLength})
  public preview!: string;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.photos.invalid})
  @MaxLength(256, {each: true, message: CreateOfferValidationMessage.photos.maxLength})
  public photos!: string[];

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalid})
  public isPremium!: boolean;

  @IsOptional()
  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalid})
  public isFavorite!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  public rating!:number;

  @IsOptional()
  @IsEnum(housingTypes, {message: CreateOfferValidationMessage.housingType.invalid})
  public housingType!: HousingType;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.roomsCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.roomsCount.minValue})
  @Max(8, {message: CreateOfferValidationMessage.roomsCount.maxValue})
  public roomsCount!: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.guestsCount.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guestsCount.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guestsCount.maxValue})
  public guestsCount!: number;

  @IsOptional()
  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price!: number;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.facilities.invalidFormat})
  @IsEnum(housingTypes, {each: true, message: CreateOfferValidationMessage.facilities.invalid})
  public facilities!: Facilities[];

  @IsOptional()
  @IsInt()
  public commentsCount!: number;

  @IsOptional()
  @MinLength(10, {message: CreateOfferValidationMessage.coordinates.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.coordinates.maxLength})
  public coordinates!: string;
}
