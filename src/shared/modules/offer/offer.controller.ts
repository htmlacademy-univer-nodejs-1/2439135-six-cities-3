import {inject, injectable} from 'inversify';
import {Response, Request} from 'express';
import {ParamCity, ParamOfferId} from './type/param-offerid.type.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  PrivateRouteMiddleware,
  HttpMethod, ValidateDtoMiddleware, ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../types/index.js';
import {OfferService} from './offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './create-offer-request.type.js';
import { CommentService } from '../comment/comment-service.interface.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import { DEFAULT_DISCUSSED_OFFER_COUNT, DEFAULT_NEW_OFFER_COUNT } from './offer.constant.js';
import {CommentRdo} from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    //offers
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
          new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    // /offers/{offerId}
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    // /offers/{offerId}/comments
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    // /offers/premium/{city}:
    this.addRoute({
      path: '/premium/:city',
      method: HttpMethod.Get,
      handler: this.getPremium,
      middlewares: [ ]
    });
    //  /offers/favorite:
    this.addRoute({ path: '/favorite', method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares:[   new PrivateRouteMiddleware(),] });

    // /offers/favorite/{offerId}:
    this.addRoute({ path: '/favorite/:offerId',
      method: HttpMethod.Post,
      handler: this.addToFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]});
    this.addRoute({ path: '/favorite/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteFromFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

  }

  //offers
  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  // /offers/{offerId}
  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  // /offers/{offerId}/comments:
  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  // /offers/premium/{city}:
  public async getPremium({ params }: Request<ParamCity>, res: Response): Promise<void> {
    const { city } = params;
    const offers = await this.offerService.getPremiumOffersByCity(city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  //  /offers/favorite:
  public async getFavorites({ tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const offers = await this.offerService.getFavoriteOffersByAuthor(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  // /offers/favorite/{offerId}:
  public async addToFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
   const { offerId } = params;
   await this.offerService.changeFavoriteByIdToTrue(offerId, tokenPayload.id);
   this.noContent(res, {});
  }

  public async deleteFromFavorite({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
   const { offerId } = params;
   await this.offerService.changeFavoriteByIdToFalse(offerId, tokenPayload.id);
   this.noContent(res, {});
  }

  public async getNew(_req: Request, res: Response) {
    const newOffers = await this.offerService.findNew(DEFAULT_NEW_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, newOffers));
  }

  public async getDiscussed(_req: Request, res: Response) {
    const discussedOffers = await this.offerService.findDiscussed(DEFAULT_DISCUSSED_OFFER_COUNT);
    this.ok(res, fillDTO(OfferRdo, discussedOffers));
  }
}
