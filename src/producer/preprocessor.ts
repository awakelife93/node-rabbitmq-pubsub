export const generateMessage = (): string[] => {
  return new Array(100).fill("").map((value, index: number) => `token${index}`);
};
