import { generateArrayOfIdenticalMembers, generateRandomArray } from '../../../../utils/tests/array';
import { randomInt } from '../../../../utils/tests/number';

import { LinkedList } from '../linked-list';

interface Config {
  readonly list: LinkedList<number>;

  readonly arrayOfItems: readonly number[];
}

const createConfig = (
  arrayGenerator: () => readonly number[]
): Config => {
  const items = arrayGenerator();
  const list = LinkedList.fromArray(items);

  return {
    arrayOfItems: items,
    list,
  };
}

describe('LinkedList', () => {
  test('should convert the data into an array', () => {
    const { arrayOfItems, list } = createConfig(generateRandomArray);

    expect(
      list.toArray().toString()
    ).toStrictEqual(arrayOfItems.toString());
  });

  test('should create an empty list', () => {
    const emptyList = new LinkedList();
    expect(emptyList.toArray()[0]).toBe(null);
  });

  test('should add items to the list at initialization',  () => {
    const value = randomInt();
    const list = new LinkedList(value);
    expect(list.toArray()[0]).toStrictEqual(value);
  });

  test('should add items to the list', () => {
    const value = randomInt();
    const list = new LinkedList();
    list.add(value);
    expect(list.toArray()[0]).toStrictEqual(value);
  });

  test('should remove values from the list', () => {
    const {  arrayOfItems, list } = createConfig(generateArrayOfIdenticalMembers);

    const value = arrayOfItems[0];

    expect(list.remove(value).toArray()[0]).toStrictEqual(null);
  });
})

