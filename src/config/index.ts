import "dotenv/config";
import { ExchangeType } from "../amqp/type";

type Config = {
  DEAD_LETTER_EXCHANGE: string;
  DEAD_LETTER_QUEUE_NAME: string;
  DEFAULT_QUEUE_NAME: string;
  SEND_MESSAGE_EXCHANGE: string;
  EXCHANGE_SEND_MESSAGE_QUEUE_NAME: string;
  RABBITMQ_URL: string;
  EXCHANGE_TYPE: ExchangeType;
  IS_TEST_MESSAGES: boolean;
  IS_ACK: boolean;
  IS_RESET_RESOURCES: boolean;
};

const config: Config = {
  DEAD_LETTER_EXCHANGE:
    process.env.DEAD_LETTER_EXCHANGE ?? "deadLetterExchange",
  DEAD_LETTER_QUEUE_NAME:
    process.env.DEAD_LETTER_QUEUE_NAME ?? "deadLetterQueue",
  DEFAULT_QUEUE_NAME: process.env.QUEUE_NAME ?? "deleteTokens",
  SEND_MESSAGE_EXCHANGE:
    process.env.SEND_MESSAGE_EXCHANGE ?? "sendMessageExchange",
  EXCHANGE_SEND_MESSAGE_QUEUE_NAME:
    process.env.EXCHANGE_SEND_MESSAGE_QUEUE_NAME ?? "exchangeSendMessageQueue",
  EXCHANGE_TYPE: process.env.EXCHANGE_TYPE ?? "direct",
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "amqp://localhost:5673",
  IS_TEST_MESSAGES: process.env.IS_TEST_MESSAGES
    ? process.env.IS_TEST_MESSAGES === "true"
    : true,
  IS_ACK: process.env.IS_ACK === "true",
  IS_RESET_RESOURCES: process.env.IS_RESET_RESOURCES === "true",
};

export default config;
