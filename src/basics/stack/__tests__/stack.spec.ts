import { randomInt } from '../../../../utils/tests/number';

import { Stack } from '../';

interface Config {
  readonly value1: number;
  readonly value2: number;
  readonly stack: Stack<number>;
}

const createConfig = (): Config => {
  const value1 = randomInt();
  const value2 = randomInt();
  const stack = Stack.fromArray([value1, value2]);

  return { value1, value2, stack }
}

describe('Stack', () => {
  it('should create an empty stack if no initial value is passed in', () => {
    const stack = new Stack();
    expect(stack.peek()).toStrictEqual(null);
  });

  it('should add the initial value to the stack', () => {
    const { value1 } = createConfig();
    const stack = new Stack(value1);

    expect(stack.peek()).toStrictEqual(value1);
  });

  it('.enstack(x) should add items to the end of the stack', () => {
    const { value1, value2 } = createConfig();
    const stack = new Stack<number>();
    stack.push(value1).push(value2);

    expect(stack.peek()).toStrictEqual(value2);
  });

  it('.peek(x) should returns the first item in the stack and shouldn\'t remove it', () => {
    const { value2, stack } = createConfig();

    expect(stack.peek()).toStrictEqual(value2);
    expect(stack.peek()).toStrictEqual(value2);
  });

  it('.destack(x) should returns the first item in the stack and remove it', () => {
    const { value1, value2, stack } = createConfig();

    expect(stack.pop()).toStrictEqual(value2);
    expect(stack.pop()).toStrictEqual(value1);
    expect(stack.pop()).toStrictEqual(null);
  });
});
