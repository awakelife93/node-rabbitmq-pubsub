import { convertMsToSeconds } from "@/utils/convert";
import _ from "lodash";
import consumer from "../consumer";

// todo: intervalId, time 변수들 공통 관리
// todo: 해당 스크립트 전반적으로 분리 해낼 것
let intervalId: NodeJS.Timer | null = null;
const broker = async (): Promise<void> => {
  await start();
};

const start = async (): Promise<void> => {
  const pollingTime = 3000 * 10;

  if (_.isNull(intervalId)) {
    await work();

    intervalId = setInterval(async () => {
      await work();
    }, pollingTime);
  }
};

const work = async (): Promise<void> => {
  const { message, messageCount } = await consumer();
  const delayTime = 6000 * 10;

  if (messageCount < 1) {
    const delaySeconds = convertMsToSeconds(delayTime);
    console.log(
      `Message Queue has Non Message So, Set Delay ${delaySeconds} second`
    );

    delayStart();
  } else {
    console.log(`Number of Messages Remaining = ${messageCount}`);
    sender(message);
  }
};

const clear = (): void => {
  if (!_.isNull(intervalId)) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const restart = (): void => {
  clear();
  start();
};

const delayStart = (): void => {
  const delayTime = 6000 * 10;
  const pollingTime = 3000 * 10;

  setTimeout(() => {
    restart();
  }, delayTime - pollingTime);
};

const sender = (message: string): void => {
  // * message를 로직으로 소비하는 구간...
  console.log(`message ===> ${message}`);
};

export default broker;
