import { ClassConstructor, plainToInstance } from 'class-transformer';

export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {
  const index = (Math.random() * (max - min)) + min;
  return +index.toFixed(numAfterDigit);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition + 1, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}