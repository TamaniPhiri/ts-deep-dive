import jwt from "jsonwebtoken";
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

      const hashedPassword = await bcrypt.hash(password, 25);

      const user = await userService.CreateUser({
        name,
        email,
        password: hashedPassword,
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        error: error,
      });
    }
  },
  userLogin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await userService.GetUserByEmailAndPassword({
        email,
        password,
      });
      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
          error: "User doesn't exist",
        });
      }
      const verifyPassword = await bcrypt.compare(user.password, password);
      if (!verifyPassword) {
        return res.status(HttpStatusCode.UNAUTHORIZED).send({
          error: "Invalid Password ",
        });
      }
      const token = await jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "3s",
      });
      res.cookie("token", token, {
        httpOnly: true,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        error: error,
      });
    }
  },
};

export default userController;
