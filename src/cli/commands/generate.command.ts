import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/index.js';
import got from 'got';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import {errorStyle, pinkStyle} from '../../const.js';

export class GenerateCommand implements Command {

  private initialData: MockServerData | null = null;
  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.info(errorStyle('Error initialData'));
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    if (this.initialData !== null) {
      const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
      const tsvFileWriter = new TSVFileWriter(filepath);
      for (let i = 0; i < offerCount; i++) {
        const offer = tsvOfferGenerator.generate();
        await tsvFileWriter.write(offer);
      }
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);
    console.info(pinkStyle(`Starting generate`));
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(pinkStyle(`File ${filepath} was created!`));
    } catch (error: unknown) {
      console.error(errorStyle('Can\'t generate data'));
      console.error(errorStyle(getErrorMessage(error)));
    }
  }
}
