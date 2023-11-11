import jwt from "jsonwebtoken";
import userService from "../services/user-service";
import { Response, Request } from "express";
import HttpStatusCode from "http-status-codes";
import { User } from "../models/User";
import bcrypt from "bcrypt";

const userController = () => {
  const userRegister = async (req: Request, res: Response) => {
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

      const user = await User.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.status(HttpStatusCode.OK).json({
        message: "Registration successful",
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      console.error(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        error: "Internal Server Error",
      });
    }
  };

  const userLogin = async (req: Request, res: Response) => {
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
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
        return res.status(HttpStatusCode.UNAUTHORIZED).send({
          error: "Invalid Password",
        });
      }
      const token = jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, {
        httpOnly: true,
      });
      return res.status(HttpStatusCode.OK).send({
        email: user.email,
        name: user.name,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        error: "Internal Server Error",
      });
    }
  };

  return {
    userRegister,
    userLogin,
  };
};

export default userController();
