import { Channel, Options, Replies } from "amqplib";
import _ from "lodash";
import { ErrorStatus } from "../common/enum/error";
import AmqpInstance from "./AmqpInstance";
import { ExchangeType } from "./type";

class RabbitMQChannel {
  
  private channel: Channel | null = null;

  async initialize(): Promise<void> {
    this.channel = await AmqpInstance.instance.createChannel();

    // * listener를 등록 해야만... error handling이 가능하다. 등록 안하면 process kill
    this.channel.on("error", (error) => {
      // ...
    });
  }

  async assertQueue(
    queueName: string,
    options: Options.AssertQueue = {}
  ): Promise<Replies.AssertQueue> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return await this.channel.assertQueue(queueName, options);
  }

  async assertExchange(
    exchange: string,
    type: ExchangeType,
    options: Options.AssertExchange = {}
  ): Promise<Replies.AssertExchange> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return await this.channel.assertExchange(exchange, type, options);
  }

  async deleteExchange(
    exchange: string,
    options?: Options.DeleteExchange
  ): Promise<Replies.Empty> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return await this.channel.deleteExchange(exchange, options);
  }

  async deleteQueue(
    queueName: string,
    options?: Options.DeleteQueue
  ): Promise<Replies.DeleteQueue> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return await this.channel.deleteQueue(queueName, options);
  }

  async purgeQueue(queueName: string): Promise<Replies.PurgeQueue> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return await this.channel.purgeQueue(queueName);
  }

  async checkQueue(queueName: string): Promise<Replies.AssertQueue> {
    if (_.isNull(this.channel)) {
      throw ErrorStatus.IS_EMPTY_CHANNEL;
    }

    return await this.channel.checkQueue(queueName);
  }

  async checkExchange(exchange: string): Promise<Replies.Empty> {
    if (_.isNull(this.channel)) {
      throw ErrorStatus.IS_EMPTY_CHANNEL;
    }

    return await this.channel.checkExchange(exchange);
  }

  async bindExchange(destination: string, source: string, routingKey: string, args?: any): Promise<Replies.Empty> {
    if (_.isNull(this.channel)) {
      throw ErrorStatus.IS_EMPTY_CHANNEL;
    }

    return await this.channel.bindExchange(destination, source, routingKey, args);
  }

  async bindQueue(queueName: string, exchange: string, routingKey: string, args?: any): Promise<Replies.Empty> {
    if (_.isNull(this.channel)) {
      throw ErrorStatus.IS_EMPTY_CHANNEL;
    }

    return await this.channel.bindQueue(queueName, exchange, routingKey, args);
  }

  get queue(): Channel {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }

    return this.channel;
  }
}

export default new RabbitMQChannel();
