import AmqpInstance from "../amqp/AmqpInstance";
import errorHandler from "../common/error";
import config from "../config";

const worker = async () => {
  try {
    console.log("start work!!!");
    await AmqpInstance.initialize(config.RABBITMQ_URL);
  } catch (error: unknown) {
    errorHandler(error);
  }
};

export default worker;
