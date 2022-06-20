import consumer from "../consumer";

const broker = async () => {
  const message = await consumer();
  // todo: message 처리하기, 현재 개발 환경을 위해 noAck를 false로 주고있음.
  console.log(`message ==========> ${message}`);
};

export default broker;
