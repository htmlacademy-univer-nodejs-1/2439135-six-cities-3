import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';

export type CreateAuthorRequest = Request<RequestParams, RequestBody, CreateAuthorDto>;