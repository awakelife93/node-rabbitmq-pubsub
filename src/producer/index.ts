import Producer from "../amqp/Producer";
import config from "../config";
import { generateMessage } from "./preprocessor";

const producer = async (): Promise<void> => {
  await publishTestMessages();
};

const publishTestMessages = (): void => {
  const sampleMessages = generateMessage();

  sampleMessages.forEach(async (message: string, index: number) => {
    console.log(await Producer.sendMessage(config.QUEUE_NAME, message));
  })
};

export default producer;