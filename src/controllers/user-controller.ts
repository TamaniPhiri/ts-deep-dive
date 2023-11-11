import userService from "../services/user-service";
import { Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const userController = {
  userRegister: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          error: "User already exists",
        });
      }
      
      // Await the result of bcrypt.hash to get the actual hashed password
      const hashedPassword = await bcrypt.hash(password, 20);
      
      const user = await userService.CreateUser({
        name,
        email,
        password: hashedPassword, // Now it's a string
      });
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
