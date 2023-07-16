
/** List node. */
export class ListNode<T> {

  public constructor(
    public value: T
  ) {}
}

/** Linked list. */
export class LinkedList<T> {

  public head: ListNode<T> | null = null;

  /** List of nodes. */
  public tail: LinkedList<T> | null = null;

  public constructor(value?: T) {
    if (value !== undefined && value !== null) {
      this.head = new ListNode(value);
    }
  }

  public static fromArray<T>(values: readonly T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    values.forEach(value => list.add(value));

    return list;
  }

  /** Gets value from head. */
  public get value(): T | null {
    return this.head?.value ?? null;
  }

  /**
   * Adds a value to the end of the list.
   * @param value Value.
   *
   * @example
   * const list = new LinkedList(1);
   * list.add(2).add(3).add(4); // 1 -> 2 -> 3 -> 4.
   */
  public add(value: T): LinkedList<T> {
    let current: LinkedList<T> = this;

    while (current.tail !== null) {
      current = current.tail;
    }

    if (current.value === null) {
      current.head = new ListNode(value);
    } else {
      current.tail = new LinkedList(value);
    }

    return this;
  }

  /**
   * Removes all values from the list.
   * @param value Value to be remove.
   *
   * @example
   * const list = new LinkedList(2);
   * list.add(1).add(2).add(2).add(3); // 2 -> 1 -> 2 -> 2 -> 3.
   * list.remove(2); // 1 -> 3.
   */
  public remove(value: T): LinkedList<T> {
    let current: LinkedList<T> | null = this;

    while (current !== null) {
      if (current.value === value) {
        this.head = this.tail?.head ?? null;
        this.tail = this.tail?.tail ?? null;
      } else {
        current = current.tail;
      }
    }

    return this;
  }

  /**
   * Converts a linked list to an array.
   * If the list is cyclic, an infinite loop will occur.
   *
   * @example
   * const list = new LinkedList(1);
   * list.add(2).add(3).add(4);
   *
   * list.toArray(); // [1, 2, 3, 4].
   */
  public toArray(): (T | null)[] {
    let array: (T | null)[] = [];

    let current: LinkedList<T> | null = this;

    while (current !== null) {
      array.push(current.value)
      current = current.tail
    }

    return array;
  }
}


