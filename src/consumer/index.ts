import Consumer from "../amqp/Consumer";
import config from "../config";
import { generateMessage } from "./preprocessor";

const consumer = async (): Promise<string> => {
  return await getMessage();
}

const getMessage = async () => {
  const messageItem = await Consumer.get(config.QUEUE_NAME);
  return generateMessage(messageItem);
}

export default consumer;