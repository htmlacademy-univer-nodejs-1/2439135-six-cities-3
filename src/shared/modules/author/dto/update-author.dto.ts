import {authorTypeEnum} from '../../../types/index.js';

export class UpdateAuthorDto {
    public name!: string;
    public authorType!: authorTypeEnum.Default | authorTypeEnum.Pro;
    public avatar?: string;
    public password?: string;
  }