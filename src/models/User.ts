import { prisma } from "../config/db";

export interface IUser {
  id?: number;
  name?: string | any;
  email: string;
  password: string;
  phone?: string;
}

export const User = prisma.user;
