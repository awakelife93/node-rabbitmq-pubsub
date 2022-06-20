import Queue from "@/amqp/Queue";
import { getErrorItem } from "@/utils/error";
import { Replies } from "amqplib";
import config from "../config";

const queueController = async (): Promise<Replies.AssertQueue> => {
  return await initialize();
}

const initialize = async (): Promise<Replies.AssertQueue> => {
  try {
    await Queue.initialize();
    return await Queue.checkQueue(config.QUEUE_NAME);
  } catch(error: unknown) {
    const _error = getErrorItem(error);
    
    // ! queue가 없다.
    if (_error.message.match("NOT_FOUND")) {
      return await createQueue(config.QUEUE_NAME);
    } else {
      throw error;
    }
  }
};

const createQueue = async (queueName: string): Promise<Replies.AssertQueue> => {
  // * 해당 에러는 채널을 종료시키므로 다시 initialize...
  await Queue.initialize();
  return await Queue.assertQueue(queueName);
};

export default queueController;