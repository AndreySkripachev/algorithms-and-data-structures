type Nullable<T> = T | null;

export class DoublyLinkedList<T> {

  /** Follow list node. */
  public next: Nullable<DoublyLinkedList<T>> = null;

  /** Previous list node. */
  public prev: Nullable<DoublyLinkedList<T>> = null;

  public constructor(

    /** Value. */
    public value: T,
  ) {}

  /**
   * Creates a doubly-linked list from array.
   * @param values Array of values.
   */
  public static fromArray<T>(values: readonly T[]): DoublyLinkedList<T> {
    const first = new DoublyLinkedList(values[0]);
    let current = first;

    values.slice(1).forEach(val => current = current.append(new DoublyLinkedList(val)));

    return first;
  }

  /**
   * Returns the length of the list starting from the current element.
   */
  public get length(): number {
    let length = 0;
    let current: DoublyLinkedList<T> | null = this;

    while (current !== null) {
      current = current.next;
      length += 1;
    }

    return length;
  }

  /**
   * Returns all values of the list items one by one.
   */
  [Symbol.iterator] = function*() {
    let current: DoublyLinkedList<T> | null = this;

    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }

  /**
   * Connects the current node to another node
   * @param list List to append.
   */
  public append(list: DoublyLinkedList<T>): DoublyLinkedList<T> {
    this.next = list;
    list.prev = this;

    return list;
  }

  /**
   * Connects the current node to another node
   * @param list List to prepend.
   */
  public prepend(list: DoublyLinkedList<T>): DoublyLinkedList<T> {
    this.prev = list;
    list.next = this;

    return list;
  }

  /**
   * Removes the current node of the list.
   */
  public remove(): DoublyLinkedList<T> {
    if (this.prev !== null) {
      this.prev.next = this.next;
    }

    if (this.next !== null) {
      this.next.prev = this.prev;
    }

    this.next = null;
    this.prev = null;

    return this;
  }

  /**
   * Returns the first element of the list.
   */
  public first(): DoublyLinkedList<T> {
    let first: DoublyLinkedList<T> = this;

    while (first.prev !== null) {
      first = first.prev;
    }

    return first;
  }

  /**
   * Converts the list to an array starting from the first node.
   */
  public toArray(): T[] {
    let current: DoublyLinkedList<T> | null = this.first();
    const array: T[] = [];

    while (current !== null) {
      array.push(current.value);
      current = current.next;
    }

    return array;
  }
}


