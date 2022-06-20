import Producer from "../amqp/Producer";
import config from "../config";
import { generateMessage } from "./preprocessor";

const producer = async (): Promise<void> => {
  await publishTestMessages();
};

const publishTestMessages = (): void => {
  const sampleMessages = generateMessage();

  sampleMessages.forEach(async (message: string, index: number) => {
    const response = await Producer.sendMessage(config.QUEUE_NAME, message);
    // todo: response가 false일 시, 실패로 간주하고 로직 설계하기.
  });
};

export default producer;
