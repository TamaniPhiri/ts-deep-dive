import { IUser } from "./../models/User";
import userRepository from "../repositories/user-repository";

const userService = () => {
  const createUser = async ({ name, email, password }: IUser) => {
    const user = await userRepository.createUser({ name, email, password });
    return user;
  };
  return {
    createUser,
  };
};

export default userService();
