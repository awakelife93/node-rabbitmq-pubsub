import { getErrorItem } from "@/utils/error";
import { getQueue } from ".";

export const getQueueMessageCount = async (
  queueName: string
): Promise<number> => {
  let messageCount = 0;

  try {
    const queue = await getQueue(queueName);
    messageCount = queue.messageCount;
  } catch (error: unknown) {
    const _error = getErrorItem(error);

    // ! checkQueue는 해당 Queue가 없을 때 에러를 내면서 Channel을 소멸시키기 때문에... 우선 예외처리 감쌌음.
    console.log(`getQueueMessageCount Error: ${_error.message}`);
  }

  return messageCount;
};
