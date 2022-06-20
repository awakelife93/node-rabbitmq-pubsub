import AmqpInstance from "../amqp/AmqpInstance";
import broker from "../broker";
import errorHandler from "../common/error";
import config from "../config";
import producer from "../producer";
import queueController from "../queue";

const worker = async () => {
  try {
    console.log("Start Worker!!!");
    await AmqpInstance.initialize(config.RABBITMQ_URL);

    const { messageCount, consumerCount, queue } = await queueController();
    console.log(`Queue Info ===> name: ${queue}, messageCount: ${messageCount}, consumerCount: ${consumerCount}`);

    if (messageCount < 1 && config.IS_TEST_MESSAGES) {
      await producer();
      console.log("Generate Test Sample Messages");
    }
    
    await broker();
    
  } catch (error: unknown) {
    errorHandler(error);
  }
};

export default worker;
