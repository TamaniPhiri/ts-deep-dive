import userService from "../services/user-service";
import { Response, Request } from "express";

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
          return res.send({
            status: 500,
            error: "User already exists",
          });
        });
      const user = await userService.CreateUser({ name, email, password });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        error: error,
      });
    }
  },
};

export default userController;
