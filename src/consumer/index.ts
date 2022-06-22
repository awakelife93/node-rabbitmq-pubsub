import { GenerateMessageItem } from "@/common/type";
import Consumer from "../amqp/Consumer";
import config from "../config";
import { generateMessageItem } from "./preprocessor";

const consumer = async (): Promise<GenerateMessageItem> => {
  return await getMessage();
};

const getMessage = async (): Promise<GenerateMessageItem> => {
  const messageItem = await Consumer.get(config.DEFAULT_QUEUE_NAME);
  return generateMessageItem(messageItem);
};

export default consumer;
