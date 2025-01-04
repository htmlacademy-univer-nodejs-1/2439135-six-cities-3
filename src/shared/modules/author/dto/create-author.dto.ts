import {authorTypeEnum} from '../../../types/index.js';
import {IsEmail, IsEnum, IsString, Length} from 'class-validator';
import { CreateAuthorMessages } from './create-author.messages.js';

export class CreateAuthorDto {
  @IsEmail({}, { message: CreateAuthorMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateAuthorMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateAuthorMessages.name.lengthField })
  public name!: string;

  @IsEnum(authorTypeEnum, { message: CreateAuthorMessages.authorType.invalidFormat })
  public authorType!: authorTypeEnum.Default | authorTypeEnum.Pro;

  @IsString({ message: CreateAuthorMessages.avatar.invalidFormat })
  public avatar?: string;

  @IsString({ message: CreateAuthorMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateAuthorMessages.password.lengthField })
  public password?: string;
}
