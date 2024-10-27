import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, Author } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { facilitiesEnum, housingTypes, citys, } from '../../types/offer.js';
import { citysCoordinates } from '../../../const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem([citys.Amsterdam, citys.Brussels, citys.Cologne, citys.Dusseldorf, citys.Hamburg, citys.Paris]);
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItems(this.mockData.photos);//.join(';');
    const isPremium = getRandomItem([true, false]);
    const isFavorite = getRandomItem([true, false]);
    const rating = generateRandomValue(1, 5).toString();
    const housingType = getRandomItem([housingTypes.Apartment, housingTypes.Hotel, housingTypes.House, housingTypes.Room]);
    const roomsCount = generateRandomValue(1, 12).toString();
    const guestsCount = generateRandomValue(1, 8).toString();
    const price = generateRandomValue(500, 15000).toString();
    const allFacilities = [facilitiesEnum.AirConditioning, facilitiesEnum.BabySeat,facilitiesEnum.Breakfast, facilitiesEnum.Fridge, facilitiesEnum.LaptopFriendlyWorkspace, facilitiesEnum.Towels, facilitiesEnum.Washer];
    const facilities = getRandomItems(allFacilities).join(', ');
    const author = getRandomItem<Author>(this.mockData.author);
   // const author = [authorName, authorEmail, authorPassword, authorType, authorAvatar].join(', ');
    const commentsCount = generateRandomValue(1, 12).toString();
    const coordinatesObj = citysCoordinates.get(city as citys);

    const coordinates = `${coordinatesObj?.latitude}, ${coordinatesObj?.longitude}`;

    const createdDate = dayjs()
      .subtract(generateRandomValue(1, 7), 'day')
      .toISOString();

    return [
      name, description, createdDate,city,
      preview, photos, isPremium, isFavorite,
      rating, housingType, roomsCount, guestsCount,
      price, facilities, author, commentsCount, coordinates
    ].join('\t');
  }
}
