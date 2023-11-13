import { Router } from "express";
import messageController from "../controllers/message-controller";

const messageRouter: Router = Router();

messageRouter.post(
  "/message/:senderId/:receiverId",
  messageController.CreateMessage
);

export default messageRouter;
