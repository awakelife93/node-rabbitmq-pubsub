import RabbitMQChannel from "@/amqp/RabbitMQChannel";
import { Replies } from "amqplib";
import config from "../config";

const exchangeController = async (): Promise<void> => {
  await initialize();
};

const initialize = async (): Promise<Replies.AssertExchange[]> => {
  let exchanges: Replies.AssertExchange[] = [];

  // * Dead Letter Exchange 생성
  const deadLetterExchange: Replies.AssertExchange = await createExchange(
    config.DEAD_LETTER_EXCHANGE
  );
  exchanges.push(deadLetterExchange);
  console.log(`Exchange Info ===> name: ${deadLetterExchange.exchange}`);

  // * 단순 메세지 전달용 Exchange 생성 (테스트용 / exchange로 메세지 쏘기 위해서...)
  const senderExchange: Replies.AssertExchange = await createExchange(
    config.SEND_MESSAGE_EXCHANGE
  );
  exchanges.push(senderExchange);
  console.log(`Exchange Info ===> name: ${senderExchange.exchange}`);

  return exchanges;
};

const createExchange = async (
  exchange: string
): Promise<Replies.AssertExchange> => {
  return await RabbitMQChannel.assertExchange(exchange, config.EXCHANGE_TYPE, {
    durable: true, // * 서버가 종료될 때 exchange가 소멸 되는 것을 방지
  });
};

export default exchangeController;
