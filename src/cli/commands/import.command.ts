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
import TsvFileReader from '../../shared/libs/file-reader/tsv-file-reader.js';
import chalk from 'chalk';


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

  public async execute(filename: string, login: string = 'admin', password: string = 'test', host: string = '127.0.0.1', dbname: string = 'six-cities_mongodb', salt: string = 'secret'): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);
    const fileReader = new TsvFileReader(filename.trim());
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);
    try {
      await fileReader.read();
    } catch (error) {
      console.error(errorStyle(`Can't import data from file: ${filename}`));
      console.error(errorStyle(getErrorMessage(error)));
    }
    console.info(chalk.green('file read done'));
  }
}
