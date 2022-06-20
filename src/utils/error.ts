export type HandlerParamsType = {
  status: number;
  message: string;
};

const generateErrorItem = (
  error: unknown,
  item: HandlerParamsType
): HandlerParamsType => {
  if (typeof error === "string") {
    item.message = error;
  } else if (error instanceof Error) {
    item.message = error.message;
  } else {
    const _error = error as HandlerParamsType;

    item.status = _error.status ?? 500;
    item.message = _error.message ?? "UNKNOWN_ERROR";
  }

  return item;
};

export const getErrorItem = (error: unknown): HandlerParamsType => {
  const item = {
    status: 500,
  } as HandlerParamsType;

  return generateErrorItem(error, item);
};