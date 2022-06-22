import { Options } from "amqplib";
import _ from "lodash";
import { ErrorStatus } from "../common/enum/error";
import { convertStringToBuffer } from "../utils/convert";
import RabbitMQChannel from "./RabbitMQChannel";

class Producer {
  
  private generateMessage(message: string): Buffer {
    if (_.isEmpty(message)) {
      throw new Error(ErrorStatus.IS_EMPTY_MESSAGE);
    }

    return convertStringToBuffer(message);
  }

  private generateOptions(options: Options.Publish): Options.Publish {
    return {
      ...options,
      persistent: true, // * 서버가 종료될 때 message가 소멸 되는 것을 방지
    };
  }

  // * Puts a message into a queue through an exchange route.
  publishMessage(
    exchange: string,
    routingKey: string,
    message: string,
    options: Options.Publish = {}
  ): boolean {
    return RabbitMQChannel.queue.publish(
      exchange,
      routingKey,
      this.generateMessage(message),
      this.generateOptions(options)
    );
  }

  // * Puts a message directly into the queue.
  sendMessage(
    queueName: string,
    message: string,
    options: Options.Publish = {}
  ): boolean {
    return RabbitMQChannel.queue.sendToQueue(
      queueName,
      this.generateMessage(message),
      this.generateOptions(options)
    );
  }
}

export default new Producer();
