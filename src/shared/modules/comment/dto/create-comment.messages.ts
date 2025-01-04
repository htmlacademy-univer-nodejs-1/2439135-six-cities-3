export const CreateCommentMessages = {
  rating: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 5',
  },
  date: {
    invalidFormat: 'date must be a valid ISO date',
  },
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
