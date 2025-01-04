export const CreateOfferValidationMessage = {
  name: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  preview: {
    maxLength: 'Too short for field «preview»',
  },
  city: {
    invalid: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  photos: {
    maxLength: 'Too short for photo of field «photos»',
    invalid: 'photos must be array',
  },
  isPremium: {
    invalid: 'value isPremium must be boolean',
  },
  isFavorite: {
    invalid: 'value isFavorite must be boolean',
  },
  housingType: {
    invalid: 'housingTypes must be apartment, house, room or hotel',
  },
  roomsCount: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 8',
  },
  guestsCount: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  facilities: {
    invalidFormat: 'facilities must be array',
    invalid: 'facilitie must be Breakfast, Air conditioning, Laptop friendly workspace,' +
      'Baby seat, Washer, Towels or Fridge',
  },
  authorId: {
    invalidId: 'authorId field must be a valid id',
  },
  coordinates: {
    minLength: 'Minimum coordinates length must be 10',
    maxLength: 'Maximum coordinates length must be 100',
  },
} as const;
