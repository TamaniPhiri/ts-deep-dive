import { IUser } from "./../models/User";
import userRepository from "../repositories/user-repository";

const userService = () => {
  const CreateUser = async ({ name, email, password }: IUser) => {
    const user = await userRepository.createUser({ name, email, password });
    return user;
  };
  const GetUserByEmailAndPassword = async ({ email, password }: IUser) => {
    const user = await userRepository.getUserByEmailAndPassword({
      email,
      password,
    });
    return user;
  };
  return {
    CreateUser,
    GetUserByEmailAndPassword,
  };
};

export default userService();
