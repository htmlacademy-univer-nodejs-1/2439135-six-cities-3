import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { AuthorService } from './author-service.interface.js';
import { Component } from '../../types/index.js';
import { DefaultAuthorService } from './default-author.service.js';
import { AuthorEntity, AuthorModel } from './author.entity.js';
import { AuthorController } from './author.controller.js';
import { Controller } from '../../libs/rest/index.js';

export function createAuthorContainer() {
  const authorContainer = new Container();
  authorContainer.bind<AuthorService>(Component.AuthorService).to(DefaultAuthorService).inSingletonScope();
  authorContainer.bind<types.ModelType<AuthorEntity>>(Component.AuthorModel).toConstantValue(AuthorModel);
  authorContainer.bind<Controller>(Component.AuthorController).to(AuthorController).inSingletonScope();

  return authorContainer;
}
