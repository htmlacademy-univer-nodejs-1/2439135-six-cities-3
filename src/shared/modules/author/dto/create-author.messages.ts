export const CreateAuthorMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatar: {
    invalidFormat: 'avatar is required',
  },
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15',
  },
  authorType: {
    invalidFormat: 'authorType must be pro or обычный',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
