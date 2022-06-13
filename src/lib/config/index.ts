import { ExchangeType } from "../amqp/type";

type Config = {
  EXCHANGE: string;
  QUEUE_NAME: string;
  RABBIT_MQ_URL: string;
  EXCHANGE_TYPE: ExchangeType;
}

const config: Config = {
  EXCHANGE: process.env.EXCHANGE ?? "deleteTokens",
  QUEUE_NAME: process.env.QUEUE_NAME ?? "deleteTokens",
  EXCHANGE_TYPE: process.env.EXCHANGE_TYPE ?? "direct",
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL ?? "",
}

export default config;