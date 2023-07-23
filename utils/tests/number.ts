import { faker } from '@faker-js/faker';

/**
 * Return random integer value.
 * By default, returns numbers between -1000 and 1000.
 * @param min Minimum value (-1000 by default).
 * @param max Maximum value (1000 by default).
 */
export const randomInt = (min = -1000, max = 1000) =>
  faker.number.int({ max, min });

/**
 * Return random positive integer value.
 * @param max Maximum value (1000 by default).
 */
export const randomPositive = (max = 1000) => faker.number.int({ max });
