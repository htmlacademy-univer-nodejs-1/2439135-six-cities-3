
export enum facilitiesEnum {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels ='Towels',
  Fridge = 'Fridge',
}
export type Facilities = 'Breakfast' | 'Air conditioning'
 | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export enum housingTypes {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}
export type HousingType = keyof housingTypes;

export enum citys {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}
export type City = keyof citys;


export type Author = {
  /**
   * Имя
   * Мин. длина 1 символ, макс. длина 15 символов
   */
  name: string;

  /**
   *   Электронная почта
   *  Валидный адрес электронной почты;
   */
  email: string;

  /**
   * Тип пользователя
   * Возможные варианты: обычный, pro.
   */
  authorType: authorTypeEnum.Default | authorTypeEnum.Pro;
  /**
   *   Аватар пользователя
   *  Изображение пользователя в формате .jpg или .png;
   */
  avatar?: string;
};
export enum authorTypeEnum{
  Default='обычный',
  Pro='pro'
}
export type Comment = {
  /**
   * Текст комментария
   * Мин. длина 5 символов, макс. длина 1024 символа
   */
  text: string;

  /**
   * Дата публикации комментария
   * При создании комментария данное поле не используется
   */
  date: Date;

  /**
   * Рейтинг
   * Число от 1 до 5
   */
  rating: 1 | 2 | 3 | 4 | 5;

  /**
   * Автор комментария
   * Ссылка на сущность «Пользователь»
   */
  author: Author;
}

//export type Coordinates = { latitude: number; longitude: number };

export type Offer = {
  /**
   * Наименование
   * Мин. длин 10 символов, макс. длина 100
   */
  name: string;

  /**
   * Описание предложения
   * Мин. длина 20 символов, макс. длина 1024 символа
   */
  description: string;

  /**
   * Дата публикации предложения
   */
  date: Date;

  /**
   * Город. Один из шести городов.
   */
  city: City;

  /**
   * Превью изображения
   * Ссылка на изображение, которое используется в качестве превью;
   */
  preview: string;

  /**
   * Фотографии жилья
   * Список ссылок на фотографии жилья. Всегда 6 фотографий
   */
  photos: string[];

  /**
   * Флаг «Премиум»
   * Признак премиальности предложения
   */
  isPremium: boolean;

  /**
   * Флаг «Избранное»
   * Признак того, что предложение принадлежит списку избранных предложений пользователя
   */
  isFavorite: boolean;

  /**
   * Рейтинг
   * Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой)
   */
  rating: number;

  /**
   * Тип жилья
   * Один из вариантов: apartment, house, room, hotel
   */

  housingType: HousingType;

  /**
   * Количество комнат
   * Мин. 1, Макс. 8
   */
  roomsCount: number;

  /**
   * Количество гостей
   * Мин. 1, Макс. 10
   */
  guestsCount: number;

  /**
   * Стоимость аренды
   *  Мин. 100, Макс. 100 000
   */
  price: number;

  /**
   * Удобства
   * Список удобств. Один или несколько вариантов из списка: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge;
   */
  facilities: Facilities[];

  /**
   * Автор предложения
   * Ссылка на сущность «Пользователь»
   */
  author: Author;

  /**
   * Количество комментариев
   * Рассчитывается автоматически
   */
  commentsCount: number;

  /**
   * Координаты предложения для аренды
   * Координаты представлены широтой и долготой
   */
  coordinates: string;
};
