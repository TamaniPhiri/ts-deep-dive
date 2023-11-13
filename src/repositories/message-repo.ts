import { Messages } from "../models/Message";

const MessageRepo = () => {
  const sendMessage = async (
    senderId: number,
    receiverId: number,
    content: string
  ) => {
    const message = await Messages.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
    return message;
  };
  return {
    sendMessage,
  };
};

export default MessageRepo();