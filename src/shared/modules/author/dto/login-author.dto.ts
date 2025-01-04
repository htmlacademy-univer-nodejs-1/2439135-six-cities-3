import {CreateLoginAuthorMessage} from './login-author.messages.js';
import {IsEmail, IsString} from 'class-validator';

export class LoginAuthorDto {
  @IsEmail({}, {message: CreateLoginAuthorMessage.email.invalidFormat})
  public email: string;

  @IsString({message: CreateLoginAuthorMessage.password.invalidFormat})
  public password: string;
}
