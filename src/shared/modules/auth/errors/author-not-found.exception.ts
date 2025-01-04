import { StatusCodes } from 'http-status-codes';
import { BaseAuthorException } from './base-author.exception.js';

export class AuthorNotFoundException extends BaseAuthorException {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}
