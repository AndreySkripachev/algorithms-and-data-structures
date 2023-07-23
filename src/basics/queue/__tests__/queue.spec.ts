import { DEFAULT_LENGTH, generateRandomArray } from '../../../../utils/tests/array';
import { randomInt } from '../../../../utils/tests/number';
import { Queue } from '../queue';

interface Config {
  readonly array: readonly number[];
  readonly queue: Queue<number>;
}

const createConfig = (
  generateArray: (length: number) => readonly number[],
  length = DEFAULT_LENGTH,
): Config => {
  const array = generateArray(length);
  const queue = Queue.fromArray(array);

  return { array, queue };
}

describe('Queue', () => {
  test('should create an empty queue', () => {
    const { queue } = createConfig(generateRandomArray, 0);
    expect(queue.peek()).toStrictEqual(null);
  });

  test('should enqueue a value', () => {
    const { queue } = createConfig(generateRandomArray, 0);
    const enqueuedValue = randomInt();
    queue.enqueue(enqueuedValue);

    expect(queue.peek()).toStrictEqual(enqueuedValue);
  });

  test('.peek(x) should return first value in the queue and shouldn\'t removes it', () => {
    const { queue } = createConfig(generateRandomArray, 0);
    const VALUE_1 = 1, VALUE_2 = 2;
    queue.enqueue(VALUE_1).enqueue(VALUE_2);

    expect(queue.peek()).toStrictEqual(queue.peek());
  });

  test('.dequeue(x) should return first value in the queue and remove it', () => {
    const { queue } = createConfig(generateRandomArray, 0);
    const VALUE_1 = 1, VALUE_2 = 2;
    queue.enqueue(VALUE_1).enqueue(VALUE_2);

    expect(queue.dequeue()).toStrictEqual(VALUE_1);
    expect(queue.dequeue()).toStrictEqual(VALUE_2);
  })
});
