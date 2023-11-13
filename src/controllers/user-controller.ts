import HttpStatusCode from "http-status-codes";
import { Response, Request } from "express";
import { prisma } from "../config/db";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const UserController = () => {
  const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
          error: "User already exists",
        });
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.send({
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
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: {
            equals: email.toLowerCase(),
          },
        },
      });

      if (!user) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
          error: "User doesn't exist",
        });
      }

      const verifyPassword = await compare(password, user.password);

      if (!verifyPassword) {
        return res.status(HttpStatusCode.UNAUTHORIZED).send({
          error: "Invalid Password",
        });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1hr",
        }
      );

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
    userLogin,
    userRegister,
  };
};

export default UserController();
