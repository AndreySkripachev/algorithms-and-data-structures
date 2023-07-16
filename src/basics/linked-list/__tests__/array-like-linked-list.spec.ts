import { generateRandomArray, generateRandomPositiveArray } from '../../../../utils/tests/array';
import { expectEqualArrays } from '../../../../utils/tests/expect';
import { randomInt, randomPositive } from '../../../../utils/tests/number';

import { ArrayLikeLinkedList } from '../array-like-linked-list';

interface Config {
  readonly length: number;

  readonly array: readonly number[];

  readonly list: ArrayLikeLinkedList<number>;
}

const createConfig = (
  generateArray: (length: number) => readonly number[],
  length = 10,
): Config => {
  const array = generateArray(length);
  const list = ArrayLikeLinkedList.fromArray(array);

  return { length, array, list };
}

describe('ArrayLikeLinkedList', () => {
  test('should calculate the length of the list', () => {
    const { list, length } = createConfig(generateRandomArray, randomPositive());

    expect(list.length).toStrictEqual(length);
  });

  describe('.forEach(callback)', () => {
    test('should be called for all items in the list', () => {
      const { list, length } = createConfig(generateRandomArray, randomPositive(100));

      let callCount = 0;
      list.forEach(() => callCount++);

      expect(callCount).toStrictEqual(length);
    });

    test('shouldn\'t call if list is empty', () => {
      const list = new ArrayLikeLinkedList();

      let callCount = 0;
      list.forEach(() => callCount++);

      expect(callCount).toStrictEqual(0);
    });
  });

  test('shift() should remove the first item of the list', () => {
    const { list, array, length } = createConfig(generateRandomArray, randomInt(3, 100));
    list.shift();

    // The length of the list should decrease.
    expect(list.length).toStrictEqual(length - 1);

    // The first element must shift.
    expectEqualArrays(list.toArray(), array.slice(1));
  });

  test('pop() should remove the last element of the list', () => {
    const { array, length, list } = createConfig(generateRandomArray, randomInt(3));
    list.pop();

    expect(list.length).toStrictEqual(length - 1);
    expectEqualArrays(list.toArray(), array.slice(0, -1));
  });

  test('push(x) should add multiple items to the end of the list', () => {
    const { array, list } = createConfig(generateRandomArray, randomInt(1, 10));
    const itemsToBePushed = generateRandomArray(5);

    list.push(...itemsToBePushed);
    expectEqualArrays(list.toArray(), [...array, ...itemsToBePushed]);
  });

  test('unshift() should add multiple items before the first item of the list', () => {
    const { array, list } = createConfig(generateRandomArray, randomInt(1, 10));
    const itemsToBePushed = generateRandomArray(5);
    list.unshift(...itemsToBePushed);

    expectEqualArrays(list.toArray(), [...itemsToBePushed, ...array]);
  });

  describe('.at(x)', () => {
    test('should find the element in the list', () => {
      const { array, length, list } = createConfig(generateRandomArray, randomInt(10, 20));
      const randomIndex = randomInt(0, length);
      const element = list.at(randomIndex);

      expect(element?.value).toStrictEqual(array[randomIndex]);
    });

    test('if passes the negative index, search value from the end', () => {
      const { array, list } = createConfig(generateRandomArray, randomInt(10, 20));

      expect(list.at(-1)?.value).toStrictEqual(array.at(-1));
    });
  });

  test('map(fn) should change all list items', () => {
    const { array, list } = createConfig(generateRandomArray, randomInt(10, 20));
    const double = (e: number) => e * 2;
    list.map(double);

    expectEqualArrays(list.toArray(), array.map(double));
  });

  test('filter(fn) should filter the list', () => {
    const { array, list } = createConfig(generateRandomArray, randomInt(10, 20));
    const filterNegative = (e: number) => e > 0;
    list.filter(e => filterNegative(e.value ?? 0));

    expectEqualArrays(list.toArray(), array.filter(filterNegative));
  });

  test('reduce(fn) should reduce the list by callback', () => {
    const { array, list } = createConfig(generateRandomArray, randomInt(10, 20));

    const reducedList = list.reduce((acc, curr) => acc + (curr.value ?? 0), 0);
    const reducedArray = array.reduce((acc, curr) => acc + curr, 0);

    expect(reducedList).toStrictEqual(reducedArray);
  });

  describe('.every(fn)', () => {
    const isPositive = (val: ArrayLikeLinkedList<number>) => (val.value ?? 0) > 0;

    test('should return `true` if every item satisfies predicate', () => {
      const { list } = createConfig(generateRandomPositiveArray, randomInt(10, 20));

      expect(list.every(isPositive)).toStrictEqual(true);
    });

    test('should return `false` if at least one item doesn\'t satisfies predicate', () => {
      const { list } = createConfig(generateRandomPositiveArray, randomInt(10, 20));
      list.add(-1);

      expect(list.every(isPositive)).toStrictEqual(false);
    });
  });

  describe('.some(fn)', () => {
    const isNegative = (val: ArrayLikeLinkedList<number>) => (val.value ?? 0) < 0;

    test('should return `true` if at least one item satisfies predicate', () => {
      const { list } = createConfig(generateRandomPositiveArray, randomInt(10, 20));
      list.add(-1);

      expect(list.some(isNegative)).toStrictEqual(true);
    });

    test('should return `false` if every item doesn\'t satisfies predicate', () => {
      const { list } = createConfig(generateRandomPositiveArray, randomInt(10, 20));

      expect(list.every(isNegative)).toStrictEqual(false);
    });
  });

  test('.splice(x) should removes elements from the list and insert element after remove', () => {
    const { array, list, length } = createConfig(generateRandomArray, randomInt(10, 20));
    const indexOfStart = Math.floor(randomInt(0, length / 2));
    const deletionCount = Math.floor(randomInt(0, length / 2));
    const items = generateRandomArray(randomInt(10, 20));

    list.splice(indexOfStart, deletionCount, ...items);
    const splicedArray = [...array];
    splicedArray.splice(indexOfStart, deletionCount, ...items);

    expectEqualArrays(list.toArray(), splicedArray);
  });
});