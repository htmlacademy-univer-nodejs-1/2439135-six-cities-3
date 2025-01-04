import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { LoginAuthorDto, AuthorEntity, AuthorService } from '../author/index.js';
import { TokenPayload } from './types/TokenPayload.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { AuthorNotFoundException, AuthorPasswordIncorrectException } from './errors/index.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from './auth.constant.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.AuthorService) private readonly authorService: AuthorService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: AuthorEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      //name: user.name,
      //authorType: user.authorType,
      //avatar: user.avatar,
      id: user.id,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginAuthorDto): Promise<AuthorEntity> {
    const user = await this.authorService.findByEmail(dto.email);
    if (! user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new AuthorNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new AuthorPasswordIncorrectException();
    }

    return user;
  }
}
