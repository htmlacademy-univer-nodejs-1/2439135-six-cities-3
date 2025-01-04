import { ParamsDictionary } from 'express-serve-static-core';
import { citys} from '../../../types/index.js';

export type ParamOfferId = {
  offerId: string;
} | ParamsDictionary;

export type ParamCity = {
  city: citys;
} | ParamsDictionary;
