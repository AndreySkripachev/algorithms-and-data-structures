import { LinkedList, ListNode } from './linked-list';

interface NonNullableValue<T> extends ArrayLikeLinkedList<T> {
  value: T;
  head: ListNode<T>;
}

export class ArrayLikeLinkedList<T> extends LinkedList<T> {

  /** List of nodes. */
  public tail: ArrayLikeLinkedList<T> | null = null;

  public static fromArray<T>(values: readonly T[]): ArrayLikeLinkedList<T> {
    const list = new ArrayLikeLinkedList<T>();
    list.push(...values);

    return list;
  }

  /**
   * Calculates the number of items in the list.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.add(1).add(1).add(1).add(1);
   *
   * console.log(list.length); // 4.
   */
  public get length(): number {
    let length = 0;

    this.forEach(() => length++);

    return length;
  }

  /**
   * Calls a callback function for each item in the list
   * @param fn Callback function.
   */
  public forEach(callbackFn: (element: NonNullableValue<T>) => void): ArrayLikeLinkedList<T> {
    let current: ArrayLikeLinkedList<T> | null = this;

    while (current !== null && current.value !== null) {
      callbackFn(current as NonNullableValue<T>);
      current = current.tail;
    }

    return this;
  }

  /**
   * Deletes the first item in the list.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.add(1).add(2).add(3).add(4);
   *
   * list.shift(); // 2 -> 3 -> 4.
   */
  public shift(): ArrayLikeLinkedList<T> {
    this.value = this.tail?.value ?? null;
    this.tail = this.tail?.tail ?? null;

    return this;
  }

  /**
   * Deletes the last item in the list.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.add(1).add(2).add(3).add(4);
   *
   * list.pop(); // 1 -> 2 -> 3.
   */
  public pop(): ArrayLikeLinkedList<T> {
    let penultimate: ArrayLikeLinkedList<T> = this;

    while (penultimate.tail !== null && penultimate.tail?.tail !== null) {
      penultimate = penultimate.tail;
    }

    penultimate.tail = null;

    return this;
  }

  /**
   * Adds multiple items to the end of the list.
   * @param items Items.
   *
   * @example
   * const list = new ArrayLikeLinkedList(1);
   * list.push(2, 3, 4); // 1 -> 2 -> 3 -> 4.
   */
  public push(...items: T[]): ArrayLikeLinkedList<T> {
    items.forEach(item => this.add(item));
    return this;
  }

  /**
   * Adds multiple items before the first item of the list.
   * @param items Items.
   *
   * @example
   * const list = new ArrayLikeLinkedList(4);
   * list.unshift(1, 2, 3); // 1 -> 2 -> 3 -> 4.
   */
  public unshift(...items: T[]): ArrayLikeLinkedList<T> {
    for (let i = items.length - 1; i >= 0; i--) {
      const shiftedElement = new ArrayLikeLinkedList<T>(this.value ?? undefined);
      shiftedElement.tail = this.tail;
      shiftedElement.value = this.value;

      this.value = items[i];
      this.tail = shiftedElement;
    }

    return this;
  }

  /**
   * Finds the element in the list matching the given index.
   * @param index Index. Negative index counts back from the end of the list
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * console.log(list.at(1).value); // 2.
   * console.log(list.at(-1).value); // 4.
   */
  public at(index: number): ArrayLikeLinkedList<T> | null {
    const { length } = this;

    if (index < 0) {
      index = length + index;
    }

    let currentId = 0;
    let current: ArrayLikeLinkedList<T> | null = this;

    while (current !== null) {
      if (currentId === index) {
        return current;
      }

      currentId++;
      current = current.tail;
    }

    return null;
  }

  /**
   * Changes all values in the list depending on the result of the function.
   * @param fn Function converting values.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * list.map(val => val * 2); // 2 -> 4 -> 6 -> 8.
   */
  public map(callbackFn: (element: T | null) => T): ArrayLikeLinkedList<T> {
    let current: ArrayLikeLinkedList<T> | null = this;

    while (current !== null) {
      current.value = callbackFn(current.value);
      current = current.tail;
    }

    return this;
  }

  /**
   * The value that results from running the "reducer" callback function to completion over the entire array.
   * @param callbackFn A function to execute for each element in the list.
   * Its return value becomes the value of the accumulator parameter on the next invocation of callbackFn.
   * @param initialValue Default accumulator value.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * list.reduce((acc, curr) => acc + curr.value, 0); // 1 + 2 + 3 + 4 = 10.
   */
  public reduce<R>(
    callbackFn: (acc: R, curr: ArrayLikeLinkedList<T>) => R,
    initialValue: R
  ): R {
    let acc = initialValue;

    this.forEach(node => {
      acc = callbackFn(acc, node);
    });

    return acc;
  }

  /**
   * Checks if each element of the list satisfies the condition.
   * @param predicate Predicate callback.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * list.every(e => e.value > 0); // true.
   *
   * list.add(-1);
   *
   * list.every(e => e.value > 0); // false.
   */
  public every(predicate: (element: ArrayLikeLinkedList<T>) => boolean): boolean {
    let current: ArrayLikeLinkedList<T> | null = this;

    while (current !== null) {
      if (!predicate(current)) {
        return false;
      }

      current = current.tail;
    }

    return true;
  }

  /**
   * Checks if at least one element of the list satisfies the condition.
   * @param predicate Predicate callback.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * list.some(e => e.value < 0); // false.
   *
   * list.add(-1);
   *
   * list.some(e => e.value < 0); // true.
   */
  public some(predicate: (element: ArrayLikeLinkedList<T>) => boolean): boolean {
    let current: ArrayLikeLinkedList<T> | null = this;

    while (current !== null) {
      if (predicate(current)) {
        return true;
      }

      current = current.tail;
    }

    return false;
  }

  /**
   * Deletes several elements starting with the `start` element and inserts several other elements.
   * @param start Deletion start index.
   * @param deleteCount Number of items to be removed.
   * @param items Items to be inserted after removal.
   *
   * @example
   * const list = new ArrayLikeLinkedList();
   * list.push(1, 2, 3, 4);
   *
   * list.splice(
   *   1, // Start index
   *   2, // Deletion count
   *   5, 6, // Items to be inserted,
   * ); // 1 -> 5 -> 6 -> 4.
   */
  public splice(start: number, deleteCount = 0, ...items: T[]): ArrayLikeLinkedList<T> {
    const { length } = this;

    if (start < 0) {
      start = start + length;
    }

    if (start >= length || start < 0) {
      this.push(...items);
      return this;
    }

    let nodeFrom = this.at(start) as ArrayLikeLinkedList<T>;

    for (let i = 0; i < (deleteCount ?? 0) && nodeFrom.tail !== null; i++) {
      nodeFrom.removeNode();
    }

    for (const item of items) {
      const newNode = new ArrayLikeLinkedList<T>(nodeFrom.value ?? undefined);
      newNode.tail = nodeFrom.tail;

      nodeFrom.tail = newNode;
      nodeFrom.value = item;
      nodeFrom = nodeFrom.tail;
    }

    return this;
  }
}
