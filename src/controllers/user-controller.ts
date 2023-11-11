import userService from "../services/user-service";
import { Response, Request } from "express";

const userController = () => {
  const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      //   const existingUser = await userService.GetUserByEmailAndPassword({
      //     email,
      //     password,
      //   });
      const user = await userService.CreateUser({ name, email, password });
      res.json(user);
    } catch (error) {
      console.log(error);
      res.send({
        status: 500,
        error: error,
      });
    }
  };
  return {
    userRegister,
  };
};

export default userController();
