import { randomInt } from './number';

interface ListBase<T> {
  value: T | null;
  next: ListBase<T> | null;
}

const getListLength = <T, TList extends ListBase<T>>(listBase: TList): number => {
  let length = 0;
  let current: ListBase<T> | null = listBase;

  while (current !== null && current.value !== null) {
    length++;
    current = current.next;
  }

  return length;
}

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
