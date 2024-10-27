import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AuthorService } from './author-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultAuthorService } from './default-author.service.js';
import { AuthorEntity, AuthorModel } from './author.entity.js';

export function createAuthorContainer() {
  const authorContainer = new Container();
  authorContainer.bind<AuthorService>(Component.AuthorService).to(DefaultAuthorService).inSingletonScope();
  authorContainer.bind<types.ModelType<AuthorEntity>>(Component.AuthorModel).toConstantValue(AuthorModel);

  return authorContainer;
}
