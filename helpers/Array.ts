/*
 * Split a big `originalArray` into smaller arrays of `size` elements
 */
export const getArrayChunks = <T>(originalArray: T[], size: number): T[][] => {
  return Array.from({length: Math.ceil(originalArray.length / size)}, (v, i) =>
    originalArray.slice(i * size, i * size + size)
  );
};
