import { LinkedList } from '../linked-list';

/** Stack. */
export class Stack<T> {

  private stack = new LinkedList<T>();

  public constructor(initialValue?: T) {
    if (initialValue) {
      this.stack.add(initialValue);
    }
  }

  public static fromArray<T>(items: readonly T[]): Stack<T> {
    const stack = new Stack<T>();

    for (const item of items) {
      stack.push(item);
    }

    return stack;
  }

  /**
   * Pushes a value into the end of the stack stack.
   * @param value Value.
   */
  public push(value: T): Stack<T> {
    const newElement = new LinkedList(value);

    if (this.stack.value !== null) {
      newElement.tail = this.stack;
    }

    this.stack = newElement

    return this;
  }

  /**
   * Removes the last element in the stack and returns it.
   */
  public pop(): T | null {
    const { value } = this.stack;

    if (this.stack.tail !== null) {
      this.stack = this.stack.tail;
    } else {
      this.stack.value = null;
    }

    return value;
  }

  /**
   * Reads the last element in the stack.
   */
  public peek(): T | null {
    return this.stack.value;
  }
}