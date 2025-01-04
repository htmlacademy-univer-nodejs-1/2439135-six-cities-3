import { StatusCodes } from 'http-status-codes';
import { BaseAuthorException } from './base-author.exception.js';

export class AuthorPasswordIncorrectException extends BaseAuthorException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
