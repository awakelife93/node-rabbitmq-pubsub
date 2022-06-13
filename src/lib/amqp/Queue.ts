import { Channel, Connection, Options, Replies } from "amqplib";
import _ from "lodash";
import { ErrorStatus } from "../common/enum/error";
import config from "../config";
import AmqpInstance from "./AmqpInstance";
import { ExchangeType } from "./type";

class Queue {
  private readonly amqp: Connection = AmqpInstance.instance;
  private channel: Channel | null = null;

  constructor() {
    const queue = this.initialize(config.QUEUE_NAME);
    console.log(`Queue initialized ===========> ${queue}`);
  }

  private async initialize(queueName: string, options: Options.AssertQueue = {}): Promise<Replies.AssertQueue> {
    this.channel = await this.amqp.createChannel();
    
    return await this.channel.assertQueue(queueName, {
      ...options,
      durable: true // * 서버가 종료될 때 queue가 소멸 되는 것을 방지
    });
  }

  async assertExchange(exchange: string, type: ExchangeType = config.EXCHANGE_TYPE, options?: Options.AssertExchange): Promise<Replies.AssertExchange> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }
    
    return await this.channel.assertExchange(exchange, type, options);
  }

  async deleteExchange(exchange: string, options?: Options.DeleteExchange): Promise<Replies.Empty> {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }
    
    return await this.channel.deleteExchange(exchange, options);
  }

  async deleteQueue(queueName: string, options?: Options.DeleteQueue): Promise<Replies.DeleteQueue> {
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

  get queue(): Channel {
    if (_.isNull(this.channel)) {
      throw new Error(ErrorStatus.IS_EMPTY_CHANNEL);
    }
    
    return this.channel;
  }
}

export default new Queue();