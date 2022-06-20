import { GetMessage } from "amqplib";
import { convertBufferToString } from "../utils/convert";

export const generateMessage = (messageItem: GetMessage | false): string => {
  return messageItem ? convertBufferToString(messageItem.content) : "";
};
