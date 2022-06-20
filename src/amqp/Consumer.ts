import { ConsumeMessage, GetMessage, Options } from "amqplib";
import config from "../config";
import Queue from "./Queue";

class Consumer {
  consume(
    queueName: string,
    onMessage: (msg: ConsumeMessage | null) => void,
    options: Options.Consume = {
      noAck: config.IS_ACK,
    }
  ) {
    Queue.queue.consume(queueName, onMessage, options);
  }

  async get(
    queueName: string,
    options: Options.Get = {
      noAck: config.IS_ACK,
    }
  ): Promise<GetMessage | false> {
    return await Queue.queue.get(queueName, options);
  }
}

export default new Consumer();
