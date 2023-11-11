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
  return {
    createUser,
  };
};

export default userRepository;
