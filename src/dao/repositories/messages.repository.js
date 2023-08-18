import { messageModel } from "../models/message.model.js";

export default class MessagesRepository {
  constructor() {
    this.model = messageModel;
  }

  getMessages = async () => {
    try {
      const messages = await this.model.find().lean();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };

  createMessage = async (message) => {
    try {
      const createdMessage = await this.model.create(message);
      socket.io.emit("message_add", createdMessage);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };
}

