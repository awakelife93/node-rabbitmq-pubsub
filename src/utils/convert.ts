export const convertBufferToString = (
  buffer: Buffer,
  encodingType: BufferEncoding = "utf-8"
): string => {
  return buffer.toString(encodingType);
};

export const convertStringToBuffer = (str: string): Buffer => {
  return Buffer.from(str);
};
