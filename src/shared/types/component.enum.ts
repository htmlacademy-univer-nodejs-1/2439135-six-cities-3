export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),

  DatabaseClient: Symbol.for('DatabaseClient'),
  AuthorService: Symbol.for('UserService'),
  AuthorModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),

  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),

  ExceptionFilter: Symbol.for('ExceptionFilter'),
  AuthorController: Symbol.for('AuthorController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentController'),

  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
} as const;
