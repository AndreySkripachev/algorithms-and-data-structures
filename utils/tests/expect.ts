
export const expectEqualArrays = <T, R>(
  a: readonly T[],
  b: readonly R[],
) => expect(a.toString()).toStrictEqual(b.toString());
