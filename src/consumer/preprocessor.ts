import { GetMessage } from "amqplib";
import _ from "lodash";
import { convertBufferToString } from "../utils/convert";

export const generateMessage = (messageItem: GetMessage | false): string => {
  let message = "";

  if (messageItem) {
    message = convertBufferToString(messageItem.content);
    checkDeadLetter(messageItem);
  }

  return message;
};

export const checkDeadLetter = (messageItem :GetMessage) => {
  if (!_.isUndefined(messageItem.properties.headers["x-first-death-reason"])) {
    console.log(`============> x-first-death-queue ${messageItem.properties.headers["x-first-death-reason"]}`); 
  }

  if (!_.isUndefined(messageItem.properties.headers["x-first-death-exchange"])) {
    console.log(`============> x-first-death-queue ${messageItem.properties.headers["x-first-death-exchange"]}`);
  }

  if (!_.isUndefined(messageItem.properties.headers["x-first-death-queue"])) {
    console.log(`============> x-first-death-queue ${messageItem.properties.headers["x-first-death-queue"]}`);
  }
};
