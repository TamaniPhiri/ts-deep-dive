import userService from "../services/user-service";
import { Response, Request } from "express";
import HttpStatusCode from "http-status-codes";

const userController = {
  userRegister: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      await userService
        .GetUserByEmailAndPassword({
          email,
          password,
        })
        .then(() => {
          return res.status(HttpStatusCode.UNAUTHORIZED).send({
            error: "User already exists",
          });
        });
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
