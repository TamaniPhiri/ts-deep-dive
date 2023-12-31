import { Router } from "express";
import messageController from "../controllers/message-controller";
import Auth from "../middleware/Auth";

const messageRouter: Router = Router();

messageRouter.post(
  "/:senderId/:receiverId",
  Auth,
  messageController.CreateMessage
);

export default messageRouter;
