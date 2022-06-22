import Producer from "../amqp/Producer";
import config from "../config";
import { generateMessage } from "./preprocessor";

const producer = async (): Promise<void> => {
  await publishTestMessages();
};

const publishTestMessages = (): void => {
  const sampleMessages = generateMessage();

  sampleMessages.forEach(async (message: string, index: number) => {
    // * deleteTokens Queue에 들어간다.
    await Producer.sendMessage(config.DEFAULT_QUEUE_NAME, message);
    // * defaultMessageQueue Queue에 들어간다.
    await Producer.publishMessage(config.SEND_MESSAGE_EXCHANGE, "", message);
  });
};

export default producer;
