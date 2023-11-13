import HttpStatusCode from "http-status-codes";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface IUserRequest extends Request {
  user?: any;
}

const Auth = (req: IUserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(HttpStatusCode.UNAUTHORIZED).send({
      message: "Unauthorized token",
      error: error,
    });
  }
};

export default Auth;
