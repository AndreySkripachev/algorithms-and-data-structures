import { faker } from '@faker-js/faker';

export const randomInt = (min = -1000, max = 1000) => 
  faker.number.int({ max, min });

export const randomPositive = (max = 1000) => faker.number.int({ max });
