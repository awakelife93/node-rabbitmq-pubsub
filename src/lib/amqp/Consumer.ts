import { Channel, ConsumeMessage, GetMessage, Options } from "amqplib";
import Queue from "./Queue";

class Consumer {
  private readonly queue: Channel = Queue.queue;

  consume(queueName: string, onMessage: (msg: ConsumeMessage | null) => void, options?: Options.Consume) {
    this.queue.consume(queueName, onMessage, options);
  }

  async get(queueName: string, options: Options.Get): Promise<GetMessage | false> {
    return await this.queue.get(queueName, options);
  }
}

export default new Consumer();