import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import { ErrorStatus } from "@/common/enum/error";
import { getErrorItem } from "@/utils/error";

export const getQueueMessageCount = async (
  queueName: string
): Promise<number> => {
  let messageCount = 0;

  try {
    messageCount = await (
      await RabbitMQChannel.checkQueue(queueName)
    ).messageCount;
  } catch (error: unknown) {
    const _error = getErrorItem(error);

    // ! checkQueue는 해당 Queue가 없을 때 에러를 내면서 Channel을 소멸시키기 때문에... 우선 예외처리 감쌌음.
    // * 각별히 조심해서 쓰자. 프로세스 꼬이면 안된다.
    console.log(`getQueueMessageCount Error: ${_error.message}`);
    throw new Error(ErrorStatus.IS_EMPTY_QUEUE);
  }

  return messageCount;
};
