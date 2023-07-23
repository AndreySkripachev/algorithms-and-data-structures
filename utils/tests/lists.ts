interface ListBase<T> {
  value: T | null;
  next: ListBase<T> | null;
}

const getListLength = <T, TList extends ListBase<T>>(listBase: TList): number => {
  let length = 0;
  let current: ListBase<T> | null = listBase;

  while (current !== null) {
    length++;
    current = current.next;
  }

  return length;
}
