import {citys} from './shared/types/offer.js';
import chalk from 'chalk';

export const citysCoordinates: Map<string, { latitude: number; longitude: number }> =
  new Map(
    Object.entries({
      [citys.Paris]: { latitude: 48.85661, longitude: 2.351499 },
      [citys.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
      [citys.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
      [citys.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
      [citys.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
      [citys.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
    })
  );

export const errorStyle = chalk.red;
export const pinkStyle = chalk.hex('#CA09A9');
