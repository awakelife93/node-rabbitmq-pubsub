import CommonConstant from "@/common/constant";
import { convertMsToSeconds } from "@/utils/convert";
import _ from "lodash";
import consumer from "../consumer";

let intervalId: NodeJS.Timer | null = null;
const broker = async (): Promise<void> => {
  await start();
};

const start = async (): Promise<void> => {
  if (_.isNull(intervalId)) {
    await work();

    intervalId = setInterval(async () => {
      await work();
    }, CommonConstant.MESSAGE_PULLING_TIME);
  }
};

const work = async (): Promise<void> => {
  const { message, messageCount } = await consumer();

  if (messageCount < 1) {
    const delaySeconds = convertMsToSeconds(CommonConstant.DELAY_START_INTERVAL_TIME);
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
  setTimeout(() => {
    restart();
  }, CommonConstant.DELAY_START_INTERVAL_TIME - CommonConstant.MESSAGE_PULLING_TIME);
};

const sender = (message: string): void => {
  // * message를 로직으로 소비하는 구간...
  console.log(`message ===> ${message}`);
};

export default broker;
