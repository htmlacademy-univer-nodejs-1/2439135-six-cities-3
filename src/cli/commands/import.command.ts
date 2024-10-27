import { Command } from './command.interface.js';
import {errorStyle} from '../../const.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { AuthorService } from '../../shared/modules/author/author-service.interface.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultAuthorService, AuthorModel } from '../../shared/modules/author/index.js';
import { DEFAULT_DB_PORT, DEFAULT_AUTHOR_PASSWORD } from './command.constant.js';
import { Offer } from '../../shared/types/index.js';
import TsvFileReader from "../../shared/libs/file-reader/tsv-file-reader.js";


export class ImportCommand implements Command {
  private authorService: AuthorService;
  private offerService!: OfferService;
  private databaseClient!: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.authorService = new DefaultAuthorService(this.logger, AuthorModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const author = await this.authorService.findOrCreate({
      ...offer.author,
      password: DEFAULT_AUTHOR_PASSWORD
    }, this.salt);


    await this.offerService.create({
      authorId: author.id,
      ...offer
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);
    try {
      await fileReader.read();
      console.error('успешно');
    } catch (error) {
      console.error(errorStyle(`Can't import data from file: ${filename}`));
      console.error(errorStyle(getErrorMessage(error)));
    }
  }
}
/*
import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import {errorStyle} from '../../const.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { AuthorService } from '../../shared/modules/author/author-service.interface.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultAuthorService, AuthorModel } from '../../shared/modules/author/index.js';
//import { DEFAULT_DB_PORT, DEFAULT_AUTHOR_PASSWORD } from './command.constant.js';
import { Offer } from '../../shared/types/index.js';




const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = 'test';

export class ImportCommand implements Command {
  public readonly name = '--import';
  private userService!: AuthorService;
  private offerService!: OfferService;
  private databaseService!: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultAuthorService(this.logger, AuthorModel);
    this.databaseService = new MongoDatabaseClient(this.logger);
  }
  public getName(): string {
    return '--import';
  }

  private async saveOffer(offer: Offer) {
    const author = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      authorId: author.id
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    if (filename === undefined) {
      console.log(errorStyle('Укажите после команды --import путь к файлу'));
    }
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(errorStyle(`Can't read the file: ${getErrorMessage(err)}`));
    }
  }
}

 */
