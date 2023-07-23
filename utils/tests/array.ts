import { randomInt } from './number';

export const DEFAULT_LENGTH = 10;

export type NumericArrayGenerator = (length?: number) => readonly number[];

/**
 * Generates an array of random integer value from -1000 to 1000.
 * @param length Array length (10 by default).
 */
export const generateRandomArray: NumericArrayGenerator = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt());
}

/**
 * Generates an array contains identical members.
 * @param length Array length (10 by default).
 */
export const generateArrayOfIdenticalMembers: NumericArrayGenerator = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length).fill(randomInt());
  return array;
}

/**
 * Generates an array of random integer value from 0 to 1000.
 * @param length Array length (10 by default).
 */
export const generateRandomPositiveArray: NumericArrayGenerator = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt(0));
}
