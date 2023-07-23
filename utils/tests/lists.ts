import { randomInt } from './number';

interface ListBase<T> {
  value: T | null;
  next: ListBase<T> | null;
}

/**
 * Gets the length of a list without built-in list methods
 * @param listBase List.
 */
const getListLength = <T, TList extends ListBase<T>>(listBase: TList): number => {
  let length = 0;
  let current: ListBase<T> | null = listBase;

  while (current !== null && current.value !== null) {
    length++;
    current = current.next;
  }

  return length;
}

/**
 * Gets a random element of the list.
 * If the list size allows, the item is guaranteed not to be an outermost item.
 * @param listBase List.
 */
export const getRandomListItem = <T, TList extends ListBase<T>>(listBase: TList): TList => {
  const listLength = getListLength(listBase);
  let from = 1;
  let to = listLength - 1;

  if (listLength < 3) {
    from = 0;
    to = listLength;
  }

  const randomIndex = randomInt(from, to);

  let current = listBase;

  for (let i=from; i < to; i++) {
    current = current.next as TList;
  }

  return current;
}
