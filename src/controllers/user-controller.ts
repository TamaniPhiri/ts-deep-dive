import { StatusCodes } from "http-status-codes";
import { Response, Request } from "express";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const UserController = () => {
  const userRegister = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findFirst({
        where: {
          email,
        },
      });
      if (existingUser) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: "User already exists",
        });
      }

      const hashedPassword = await hash(password, 10);

      const user = await User.create({
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
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: "Internal Server Error",
      });
    }
  };

  const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findFirst({
        where: {
          email: {
            equals: email.toLowerCase(),
          },
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          error: "User doesn't exist",
        });
      }

      const verifyPassword = await compare(password, user.password);

      if (!verifyPassword) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
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

      return res.status(StatusCodes.OK).send({
        email: user.email,
        name: user.name,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error",
        error: error,
      });
    }
  };

  const userLogout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(StatusCodes.OK).send({
      message: "Logout successful",
    });
  };

  return {
    userLogin,
    userRegister,
    userLogout,
  };
};

export default UserController();
