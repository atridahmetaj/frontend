import { MessageType } from "../../../base/model/message-type.enum";

export const SUCCESS_MESSAGE = {
  severity: MessageType.SUCCESS,
  summary: "Success",
  detail: "The operation was done successfully!"
}; 

export const ERROR_MESSAGE = {
  severity: MessageType.ERROR,
  summary: "An error occurred!"
}; 

