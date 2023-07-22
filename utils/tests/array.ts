import { randomInt } from './number';

export const DEFAULT_LENGTH = 10;

export const generateRandomArray = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt());
}

export const generateArrayOfIdenticalMembers = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length).fill(randomInt());
  return array;
}

export const generateRandomPositiveArray = (length = DEFAULT_LENGTH) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt(0));
}
