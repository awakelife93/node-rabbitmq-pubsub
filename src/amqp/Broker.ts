import { convertMsToSeconds } from "@/utils/convert";
import _ from "lodash";
import consumer from "../consumer";

class Broker {
  private intervalId: NodeJS.Timer | null = null;
  private pollingTime = 3000 * 10;
  private delayTime = 6000 * 10;

  private async work(): Promise<void> {
    const { message, messageCount } = await consumer();

    if (messageCount < 1) {
      const delaySeconds = convertMsToSeconds(this.delayTime);
      console.log(
        `Message Queue has Non Message So, Set Delay ${delaySeconds} second`,
      );
    } else {
      console.log(`Number of Messages Remaining = ${messageCount}`);
      this.sender(message);
    }
  }

  async start(): Promise<void> {
    if (_.isNull(this.intervalId)) {
      await this.work();
    
      this.intervalId = setInterval(async () => {
        await this.work();
      }, this.pollingTime);
    }
  }

  clear(): void {
    if (!_.isNull(this.intervalId)) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  restart(): void {
    this.clear();
    this.start();
  }

  delayStart(): void {
    setTimeout(() => {
      this.restart();
    }, this.delayTime - this.pollingTime);
  }

  changePollingTime(ms: number): void {
    this.pollingTime = ms;
  }

  changeDelayTime(ms: number): void {
    this.delayTime = ms;
  }
  
  sender(message: string): void {
    // * message를 로직으로 소비하는 구간...
    console.log(`message ===> ${message}`);
  }
}

export default new Broker();
