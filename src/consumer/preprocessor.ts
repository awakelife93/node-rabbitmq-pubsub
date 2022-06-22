import { GenerateMessageItem } from "@/common/type";
import { GetMessage } from "amqplib";
import _ from "lodash";
import { convertBufferToString } from "../utils/convert";

export const generateMessageItem = (
  messageItem: GetMessage | false
): GenerateMessageItem => {
  let message = "";
  let messageCount = 0;

  if (messageItem) {
    message = convertBufferToString(messageItem.content);
    messageCount = messageItem.fields.messageCount;

    checkDeadLetter(messageItem);
  }

  return {
    message,
    messageCount,
  };
};

export const checkDeadLetter = (messageItem: GetMessage) => {
  if (!_.isUndefined(messageItem.properties.headers["x-first-death-reason"])) {
    console.log(
      `============> x-first-death-queue ${messageItem.properties.headers["x-first-death-reason"]}`
    );
  }

  if (
    !_.isUndefined(messageItem.properties.headers["x-first-death-exchange"])
  ) {
    console.log(
      `============> x-first-death-queue ${messageItem.properties.headers["x-first-death-exchange"]}`
    );
  }

  if (!_.isUndefined(messageItem.properties.headers["x-first-death-queue"])) {
    console.log(
      `============> x-first-death-queue ${messageItem.properties.headers["x-first-death-queue"]}`
    );
  }
};
