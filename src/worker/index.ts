import Broker from "@/amqp/Broker";
import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import bindController from "@/bind";
import exchangeController from "@/exchange";
import producer from "@/producer";
import { getQueueMessageCount } from "@/queue/preprocessor";
import AmqpInstance from "../amqp/AmqpInstance";
import errorHandler from "../common/error";
import config from "../config";
import queueController from "../queue";

const createSampleMessageData = async () => {
  const messageCount = await getQueueMessageCount(config.DEFAULT_QUEUE_NAME);

  if (messageCount < 1) {
    await producer();
    console.log("Generate Test Sample Messages");
  }
};

const worker = async () => {
  try {
    console.log("Start Worker!!!");

    await AmqpInstance.initialize(config.RABBITMQ_URL);

    await RabbitMQChannel.initialize();

    await exchangeController();

    await queueController();

    await bindController();

    if (config.IS_TEST_MESSAGES) {
      await createSampleMessageData();
    }

    await Broker.start();
  } catch (error: unknown) {
    errorHandler(error);
  }
};

export default worker;
