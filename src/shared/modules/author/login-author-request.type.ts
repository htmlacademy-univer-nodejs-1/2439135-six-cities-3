import { Request } from 'express';
import { RequestBody, RequestParams } from '../../libs/rest/index.js';
import { LoginAuthorDto } from './dto/login-author.dto.js';

export type LoginAuthorRequest = Request<RequestParams, RequestBody, LoginAuthorDto>;