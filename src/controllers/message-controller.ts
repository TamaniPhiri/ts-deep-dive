import { Request, Response } from "express";
import StatueCodes from "http-status-codes";

const MessageController = () => {
  const CreateMessage = async (req: Request, res: Response) => {
    try {
      const { senderId, receiverid } = req.params;
      const { content } = req.body;
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
