import { randomInt } from '../../../../utils/tests/number';

import { Queue } from '../queue';

interface Config {
  readonly value1: number;
  readonly value2: number;
  readonly queue: Queue<number>;
}

const createConfig = (): Config => {
  const value1 = randomInt();
  const value2 = randomInt();
  const queue = Queue.fromArray([value1, value2]);

  return { value1, value2, queue }
}

describe('Queue', () => {
  it('should create an empty queue if no initial value is passed in', () => {
    const queue = new Queue();
    expect(queue.peek()).toStrictEqual(null);
  });

  it('should add the initial value to the queue', () => {
    const { value1 } = createConfig();
    const queue = new Queue(value1);

    expect(queue.peek()).toStrictEqual(value1);
  });

  it('.enqueue(x) should add items to the end of the queue', () => {
    const { value1, value2 } = createConfig();
    const queue = new Queue<number>();
    queue.enqueue(value1).enqueue(value2);

    expect(queue.peek()).toStrictEqual(value1);
  });

  it('.peek(x) should returns the first item in the queue and shouldn\'t remove it', () => {
    const { value1, value2, queue } = createConfig();

    expect(queue.peek()).toStrictEqual(value1);
    expect(queue.peek()).toStrictEqual(value1);
  });

  it('.dequeue(x) should returns the first item in the queue and remove it', () => {
    const { value1, value2, queue } = createConfig();

    expect(queue.dequeue()).toStrictEqual(value1);
    expect(queue.dequeue()).toStrictEqual(value2);
    expect(queue.dequeue()).toStrictEqual(null);
  });
});
