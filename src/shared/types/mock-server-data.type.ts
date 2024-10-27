import {Author, Facilities} from "./offer.js";

export type MockServerData = {
  name: string[];
  description: string[];
  preview: string[];
  photos: string[];
  author: Author[];
  coordinates: string[];
  countComments: string[];
  facilities: Facilities[];
};
