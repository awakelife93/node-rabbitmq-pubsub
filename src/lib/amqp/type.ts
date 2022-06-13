export type SocketOptions = {
  timeout: number;
  noDelay: boolean;
  keepAlive: boolean;
  keepAliveDelay: number;
  clientProperties: {
    product: string;
    version: string;
    platform: string;
    information: string;
    capabilities: {
      publisher_confirms: boolean;
      exchange_exchange_bindings: boolean;
      "basic.nack": boolean;
      consumer_cancel_notify: boolean;
      "connection.blocked": boolean;
      authentication_failure_close: boolean;
    }
  }
}

export type ExchangeType = 'direct' | 'topic' | 'headers' | 'fanout' | 'match' | string;