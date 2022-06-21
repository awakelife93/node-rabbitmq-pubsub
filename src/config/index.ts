import { ExchangeType } from "../amqp/type";

type Config = {
  EXCHANGE: string;
  DEAD_LETTER_EXCHANGE: string;
  QUEUE_NAME: string;
  RABBITMQ_URL: string;
  EXCHANGE_TYPE: ExchangeType;
  IS_TEST_MESSAGES: boolean;
  IS_ACK: boolean;
};

const config: Config = {
  EXCHANGE: process.env.EXCHANGE ?? "deleteTokens",
  DEAD_LETTER_EXCHANGE: process.env.DEAD_LETTER_EXCHANGE ?? "deadLetterExchange",
  QUEUE_NAME: process.env.QUEUE_NAME ?? "deleteTokens",
  EXCHANGE_TYPE: process.env.EXCHANGE_TYPE ?? "direct",
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "amqp://localhost:5673",
  IS_TEST_MESSAGES: process.env.IS_TEST_MESSAGES
    ? process.env.IS_TEST_MESSAGES === "true"
      ? true
      : false
    : true,
  IS_ACK: process.env.IS_ACK === "true" ? true : false,
};

export default config;
