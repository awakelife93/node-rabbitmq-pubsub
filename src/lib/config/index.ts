import { ExchangeType } from "../amqp/type";

type Config = {
  EXCHANGE: string;
  QUEUE_NAME: string;
  RABBITMQ_URL: string;
  EXCHANGE_TYPE: ExchangeType;
};

const config: Config = {
  EXCHANGE: process.env.EXCHANGE ?? "deleteTokens",
  QUEUE_NAME: process.env.QUEUE_NAME ?? "deleteTokens",
  EXCHANGE_TYPE: process.env.EXCHANGE_TYPE ?? "direct",
  RABBITMQ_URL: process.env.RABBITMQ_URL ?? "",
};

export default config;
