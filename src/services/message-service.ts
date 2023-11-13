import messageRepo from "../repositories/message-repo";

const MessageService = () => {
  const SendMessage = async (
    senderId: number,
    receiverId: number,
    content: string
  ) => {
    const message = await messageRepo.sendMessage(
      senderId,
      receiverId,
      content
    );
    return message;
  };
  return {
    SendMessage
  };
};

export default MessageService();