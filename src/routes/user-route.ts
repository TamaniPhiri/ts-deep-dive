import { Router } from "express";
import userController from "../controllers/user-controller";

const userRouter: Router = Router();

userRouter.post("/register",userController.userRegister);

export default userRouter;
