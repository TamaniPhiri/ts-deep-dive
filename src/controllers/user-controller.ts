import userService from "../services/user-service";
import { Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import { User } from "../models/User";

const userController = {
  userRegister: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findFirst({
        where: {
          email,
          password,
        },
      });
      if (existingUser) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          error: "User already exists",
        });
      }
      const user = await userService.CreateUser({ name, email, password });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        error: error,
      });
    }
  },
};

export default userController;
