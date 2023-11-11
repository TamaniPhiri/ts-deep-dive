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
  const updateUserById = async ({ id, email, password, name }: IUser) => {
    await User.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password,
      },
    });
  };
  const deleteUserByID = async ({ id }: IUser) => {
    await User.delete({
      where: {
        id,
      },
    });
  };
  return {
    createUser,
    getUserByEmailAndPassword,
    updateUserById,
    deleteUserByID,
  };
};

export default userRepository();
