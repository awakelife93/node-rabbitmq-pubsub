import consumer from "../consumer";

const broker = async () => {
  const { message, messageCount } = await consumer();
  // todo: messageCount가 0이면 slow
  console.log(`message ==========> ${message}`);
};

export default broker;
