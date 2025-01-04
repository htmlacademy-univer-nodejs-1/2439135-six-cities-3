import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  BaseController,
  HttpError,
  HttpMethod,  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { CreateAuthorRequest } from './create-author-request.type.js';
import { AuthorService } from './author-service.interface.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { fillDTO } from '../../helpers/index.js';
import { AuthorRdo } from './rdo/author.rdo.js';
import { LoginAuthorRequest } from './login-author-request.type.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { AuthService } from '../auth/index.js';
import { LoggedAuthorRdo } from './rdo/logged-author.rdo.js';


@injectable()
export class AuthorController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.AuthorService) private readonly authorService: AuthorService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
    ) {
    super(logger);
    this.logger.info('Register routes for AuthorController');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateAuthorDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      //middlewares: [new ValidateDtoMiddleware(LoginAuthorDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/:authorId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('authorId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    { body }: CreateAuthorRequest,
    res: Response,
  ): Promise<void> {
    const existsAuthor = await this.authorService.findByEmail(body.email);

    if (existsAuthor) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Author with email «${body.email}» exists.`,
        'AuthorController'
      );
    }

    const result = await this.authorService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(AuthorRdo, result));
  }

  public async login(
    { body }: LoginAuthorRequest,
    res: Response,
  ): Promise<void> {
    const author = await this.authService.verify(body);
    const token = await this.authService.authenticate(author);
    const responseData = fillDTO(LoggedAuthorRdo, {email: author.email, token});
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate({ tokenPayload }: Request, res: Response) {
    const foundedAuthor = await this.authorService.findByEmail(tokenPayload.email);
    if (! foundedAuthor) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'AuthorController'
      );
    }
    this.ok(res, fillDTO(LoggedAuthorRdo, foundedAuthor));
  }
}
