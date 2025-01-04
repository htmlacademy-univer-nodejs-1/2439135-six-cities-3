import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
//import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
//import { HttpError } from '../../libs/rest/index.js';
//import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('authorId')
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate('authorId')
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate('authorId')
      .exec();
  }

  public async getPremiumOffersByCity(city: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({city: city, isPremium: true})
      .populate('authorId')
      .exec();
  }

  public async getFavoriteOffersByAuthor(authorId: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find({authorId: authorId, isFavorite:true})
      .populate('authorId')
      .exec();
  }

  public async changeFavoriteByIdToTrue(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: true}).exec();
  }

  public async changeFavoriteByIdToFalse(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: false}).exec();
  }

  public async changeRatingByOfferId(currRating: number, offerId: string):Promise<number> {
    const prevSumm = 1;//await this.offerModel.findById(offerId).exec().then(data => data?.commentsCount);
    const updatedRating = (prevSumm + currRating) / 2;
    await this.offerModel
      .findByIdAndUpdate(offerId, {rating: updatedRating}, {new: true})
      .exec();

    return updatedRating;
  }
}
