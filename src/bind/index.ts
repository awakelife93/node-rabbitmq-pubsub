import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import config from "@/config";

const bindController = async (): Promise<void> => {
  await bindQueue();
  await bindExchange();
};

const bindQueue = async () => {
  // * Dead Letter Exchange <=> Queue
  await RabbitMQChannel.bindQueue(
    config.DEFAULT_QUEUE_NAME,
    config.DEAD_LETTER_EXCHANGE,
  );

  // * Default Send Message Exchange <=> Default Message Queue (테스트용 / exchange로 메세지 쏘기 위해서...)
  await RabbitMQChannel.bindQueue(
    config.EXCHANGE_SEND_MESSAGE_QUEUE_NAME,
    config.SEND_MESSAGE_EXCHANGE,
  );
};

const bindExchange = async () => {
  // * exchange끼리 binding 필요하다면 여기에...
};

export default bindController;
