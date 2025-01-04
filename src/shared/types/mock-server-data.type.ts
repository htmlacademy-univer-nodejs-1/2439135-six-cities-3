import { Facilities } from "./offer.js";

export type MockServerData = {
  name: string[];
  description: string[];
  preview: string[];
  photos: string[];
  coordinates: string[];
  countComments: string[];
  facilities: Facilities[];

  authorName: string[];
  authorEmail: string[]
  authorType: string[];
  authorAvatar:string[];
  authorPassword:string[];
};
