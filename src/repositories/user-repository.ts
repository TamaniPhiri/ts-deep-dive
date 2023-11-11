import { IUser, User } from "../models/User";

const userRepository = () => {
  const createUser = async ({ name, email, password, phone }: IUser) => {
    await User.create({
      data: {
        name,
        email,
        password,
        phone,
      },
    });
  };
  const getUserByEmailAndPassword = async ({ email, password }: IUser) => {
    await User.findFirst({
      where: {
        email,
        password,
      },
    });
  };
  return {
    createUser,
    getUserByEmailAndPassword,
  };
};

export default userRepository;