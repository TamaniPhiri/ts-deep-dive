import { prisma } from "../config/db";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export const User = prisma.user;
