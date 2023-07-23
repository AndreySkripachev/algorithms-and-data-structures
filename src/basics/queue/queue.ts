import { LinkedList } from '../linked-list/linked-list';

/** Queue. */
export class Queue<T> {

  private queue: LinkedList<T> = new LinkedList();

  public constructor(initialValue?: T) {
    if (initialValue) {
      this.queue.add(initialValue);
    }
  }

  public static fromArray<T>(items: readonly T[]): Queue<T> {
    const queue = new Queue<T>();

    for (const item of items) {
      queue.enqueue(item);
    }

    return queue;
  }

  /**
   * Adds a value in the queue.
   * @param value Value to be added in the queue.
   */
  public enqueue(value: T): Queue<T> {
    this.queue.add(value);

    return this;
  }

  /**
   * Removes the first item from the queue and returns it.
   */
  public dequeue(): T | null {
    const value = this.queue.value;

    if (this.queue.tail !== null) {
      this.queue = this.queue.tail;
    } else {
      this.queue.value = null;
    }

    return value;
  }

  /**
   * Returns the first item from the queue.
   */
  public peek(): T | null {
    return this.queue.value;
  }
}