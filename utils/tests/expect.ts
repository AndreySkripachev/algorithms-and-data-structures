
/**
 * Expects the arrays to be the same.
 * Uses `Array.prototype.toString` method.
 * @param a Array.
 * @param b Array.
 *
 * @example
 * it('should pass', () => {
 *   const array1 = [1, 2, 3];
 *   const array2 = [1, 2, 3]; // These arrays are not equal by reference.
 *
 *   // Should pass.
 *   expectEqualArrays(array1, array2);
 * });
 *
 * it('shouldn\'t pass', () => {
 *   const array1 = [1, 2, 3];
 *   const array2 = [1, 3, 3];
 *
 *   // Shouldn't pass.
 *   expectEqualArrays(array1, array2);
 * });
 */
export const expectEqualArrays = <T, R>(
  a: readonly T[],
  b: readonly R[],
) => expect(a.toString()).toStrictEqual(b.toString());
