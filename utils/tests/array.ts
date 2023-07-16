import { randomInt } from './number';

export const generateRandomArray = (length = 10) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt());
}

export const generateArrayOfIdenticalMembers = (length = 10) => {
  const array = new Array<number>(length).fill(randomInt());
  return array;
}

export const generateRandomPositiveArray = (length = 10) => {
  const array = new Array<number>(length);
  array.fill(0);
  return array.map(() => randomInt(0));
}
