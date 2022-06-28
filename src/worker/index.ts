import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import bindController from "@/bind";
import broker from "@/broker";
import exchangeController, { deleteExchanges } from "@/exchange";
import producer from "@/producer";
import { getQueueMessageCount } from "@/queue/preprocessor";
import AmqpInstance from "../amqp/AmqpInstance";
import errorHandler from "../common/error";
import config from "../config";
import queueController, { deleteQueues } from "../queue";

const createSampleMessageData = async () => {
  const messageCount = await getQueueMessageCount(config.DEFAULT_QUEUE_NAME);

  if (messageCount < 1) {
    await producer();
    console.log("Generate Test Sample Messages");
  }
};

const resetResources = async (): Promise<void> => {
  await deleteExchanges([
    config.DEAD_LETTER_EXCHANGE,
    config.SEND_MESSAGE_EXCHANGE,
  ]);
  await deleteQueues([
    config.DEAD_LETTER_QUEUE_NAME,
    config.DEFAULT_QUEUE_NAME,
    config.EXCHANGE_SEND_MESSAGE_QUEUE_NAME,
  ]);
  console.log("Delete Exchanges & Queues");
};

const worker = async () => {
  try {
    console.log("Start Worker!!!");

    await AmqpInstance.initialize(config.RABBITMQ_URL);

    await RabbitMQChannel.initialize();

    if (config.IS_RESET_RESOURCES) {
      await resetResources();
    }

    await exchangeController();

    await queueController();

    await bindController();

    if (config.IS_TEST_MESSAGES) {
      await createSampleMessageData();
    }

    await broker();
  } catch (error: unknown) {
    errorHandler(error);
  }
};

export default worker;
