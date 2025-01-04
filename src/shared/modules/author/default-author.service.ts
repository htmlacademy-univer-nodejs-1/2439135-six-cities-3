import { AuthorService } from './author-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { AuthorEntity } from './author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@injectable()
export class DefaultAuthorService implements AuthorService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.AuthorModel) private readonly authorModel: types.ModelType<AuthorEntity>
  ) {}

  public async create(dto: CreateAuthorDto, salt: string): Promise<DocumentType<AuthorEntity>> {
    const author = new AuthorEntity(dto);
    author.setPassword(dto.password??'test', salt);

    const result = await this.authorModel.create(author);
    this.logger.info(`New author created: ${author.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<AuthorEntity> | null> {
    return this.authorModel.findOne({email});
  }

  public async findOrCreate(dto: CreateAuthorDto, salt: string): Promise<DocumentType<AuthorEntity>> {
    const existedAuthor = await this.findByEmail(dto.email);

    if (existedAuthor) {
      return existedAuthor;
    }

    return this.create(dto, salt);
  }

  public async updateById(authorId: string, dto: UpdateAuthorDto): Promise<DocumentType<AuthorEntity> | null> {
    return this.authorModel
      .findByIdAndUpdate(authorId, dto, { new: true })
      .exec();
  }
}
