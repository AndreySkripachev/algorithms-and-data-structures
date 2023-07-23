import { DEFAULT_LENGTH, NumericArrayGenerator, generateRandomArray } from '../../../../utils/tests/array';
import { expectEqualArrays } from '../../../../utils/tests/expect';
import { getRandomListItem } from '../../../../utils/tests/lists';
import { randomInt } from '../../../../utils/tests/number';

import { DoublyLinkedList } from '../';

interface Config {
  readonly list: DoublyLinkedList<number>;

  readonly arrayOfItems: readonly number[];

  readonly length: number;
}

const createConfig = (
  generateArray: NumericArrayGenerator,
  length = DEFAULT_LENGTH,
): Config => {
  const items = generateArray(length);
  const list = new DoublyLinkedList(items[0]);

  for (let i=1, curr = list; i < items.length; i++) {
    curr.next = new DoublyLinkedList(items[i]);
    curr.next.prev = curr;
    curr = curr.next;
  }

  return {
    arrayOfItems: items,
    list,
    length,
  };
}

describe('DoublyLinkedList', () => {
  test('should convert the data into an array', () => {
    const { arrayOfItems, list } = createConfig(generateRandomArray);
    expectEqualArrays(list.toArray(), arrayOfItems);
  });

  test('should be iterable', () => {
    const { arrayOfItems, list } = createConfig(generateRandomArray);
    expectEqualArrays([...list], arrayOfItems);
  });

  test('should return length of the list', () => {
    const { length, list } = createConfig(generateRandomArray, randomInt(5, 100));
    expect(list.length).toStrictEqual(length);
  })

  test('should return the first node of the list', () => {
    const { list } = createConfig(generateRandomArray);
    const nonFirstListItem = getRandomListItem(list);

    expect(nonFirstListItem.first()).toStrictEqual(list);
  });

  test('should delete a list item', () => {
    const { list, length } = createConfig(generateRandomArray);
    const removableListItem = getRandomListItem(list);
    removableListItem.remove();

    expect(list.length).toStrictEqual(length - 1);
    expect(removableListItem.next).toStrictEqual(null);
    expect(removableListItem.prev).toStrictEqual(null);
  })

  test('must replace the existing list node with the new node after the current node', () => {
    const { list } = createConfig(generateRandomArray);
    const newListNode = new DoublyLinkedList(randomInt());

    list.append(newListNode);
    expect(list.next?.value).toStrictEqual(newListNode.value);
  });
});
