import amqplib, { Connection } from "amqplib";
import _ from "lodash";
import { ErrorStatus } from "../common/enum/error";
import { SocketOptions } from "./type";

class AmqpInstance {
  private amqp: Connection | null = null;

  async initialize(url: string, socketOptions?: SocketOptions) {
    this.amqp = await amqplib.connect(url, socketOptions);
  }

  get instance(): Connection {
    if (_.isNull(this.amqp)) {
      throw new Error(ErrorStatus.IS_EMPTY_AMQP);
    }

    return this.amqp;
  }
}

export default new AmqpInstance();
