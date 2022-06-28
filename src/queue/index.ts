import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import { Replies } from "amqplib";
import config from "../config";

const queueController = async (): Promise<void> => {
  await initialize();
};

const initialize = async (): Promise<void> => {
  // * create dead letter queue
  const deadLetterQueue: Replies.AssertQueue = await createQueue(
    config.DEAD_LETTER_QUEUE_NAME
  );
  console.log(
    `Queue Info ===>
      name: ${deadLetterQueue.queue},
      messageCount: ${deadLetterQueue.messageCount},
      consumerCount: ${deadLetterQueue.consumerCount}
    `
  );

  // * create default queue
  const defaultQueue: Replies.AssertQueue = await createQueue(
    config.DEFAULT_QUEUE_NAME
  );
  console.log(
    `Queue Info ===>
      name: ${defaultQueue.queue},
      messageCount: ${defaultQueue.messageCount},
      consumerCount: ${defaultQueue.consumerCount}
    `
  );

  // * create default exchange bind queue (테스트용 / exchange로 메세지 쏘기 위해서...)
  const defaultExchangeMessageSendQueue: Replies.AssertQueue =
    await createQueue(config.EXCHANGE_SEND_MESSAGE_QUEUE_NAME);
  console.log(
    `Queue Info ===>
      name: ${defaultExchangeMessageSendQueue.queue}, 
      messageCount: ${defaultExchangeMessageSendQueue.messageCount}, 
      consumerCount: ${defaultExchangeMessageSendQueue.consumerCount}
    `
  );
};

const createQueue = async (queueName: string): Promise<Replies.AssertQueue> => {
  return await RabbitMQChannel.assertQueue(queueName, {
    durable: true, // * 서버가 종료될 때 queue가 소멸 되는 것을 방지
    deadLetterExchange: config.DEAD_LETTER_EXCHANGE, // * Dead Letter Exchange 설정
    autoDelete: false, // * Consumer 없어도 Queue 자동 삭제 방지
  });
};

export const getQueue = async (
  queueName: string
): Promise<Replies.AssertQueue> => {
  return await RabbitMQChannel.checkQueue(queueName);
};

export const deleteQueue = async (
  queueName: string
): Promise<Replies.DeleteQueue> => {
  return await RabbitMQChannel.deleteQueue(queueName);
};

export const deleteQueues = (queueNames: string[]): void => {
  queueNames.forEach(async (queueName: string) => {
    await deleteQueue(queueName);
  });
};

export default queueController;
