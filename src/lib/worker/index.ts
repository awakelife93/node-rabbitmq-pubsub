import AmqpInstance from "../amqp/AmqpInstance";
import errorHandler from "../common/error";
import config from "../config";

const worker = async () => {
  try {
    await AmqpInstance.initialize(config.RABBIT_MQ_URL);
  } catch(error: unknown) {
    errorHandler(error);
  }
}

export default worker;