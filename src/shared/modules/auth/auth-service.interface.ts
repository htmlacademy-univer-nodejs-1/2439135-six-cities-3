import { LoginAuthorDto, AuthorEntity } from '../author/index.js';

export interface AuthService {
  authenticate(author: AuthorEntity): Promise<string>;
  verify(dto: LoginAuthorDto): Promise<AuthorEntity>;
}
