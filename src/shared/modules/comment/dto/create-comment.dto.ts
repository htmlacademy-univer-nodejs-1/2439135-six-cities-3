import {IsMongoId, IsInt, IsString, Length, IsDateString, Min, Max} from 'class-validator';
import {CreateCommentMessages} from './create-comment.messages.js';

export class CreateCommentDto {
  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  @IsDateString({}, { message: CreateCommentMessages.date.invalidFormat })
  public date: Date;

  @IsString({message: CreateCommentMessages.text.invalidFormat})
  @Length(5, 1024, {message: 'min is 5, max is 1024 '})
  public text: string;

  public offerId: string;

  @IsMongoId({message: CreateCommentMessages.userId.invalidFormat})
  public authorId: string;
}
