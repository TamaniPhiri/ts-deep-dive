import { Request, Response } from "express";
import StatueCodes from "http-status-codes";
import messageService from "../services/message-service";

const MessageController = () => {
  const CreateMessage = async (req: Request, res: Response) => {
    try {
      const senderId = parseInt(req.params.senderId);
      const receiverId = parseInt(req.params.receiverId);
      const { content } = req.body;
      const message = await messageService.SendMessage(
        senderId,
        receiverId,
        content
      );
      return res.status(StatueCodes.OK).send({
        success: true,
        message: message,
      });
    } catch (error) {
      console.log(error);
      res.status(StatueCodes.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        error: error,
      });
    }
  };
  return { CreateMessage };
};

export default MessageController();
