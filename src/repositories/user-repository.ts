import { IUser, User } from "../models/User";

const userRepository = () => {
  const createUser = async ({ name, email, password, phone }: IUser) => {
    return await User.create({
      data: {
        name,
        email,
        password,
        phone,
      },
    });
  };
  const getUserByEmailAndPassword = async ({ email, password }: IUser) => {
    return await User.findFirst({
      where: {
        email,
        password,
      },
    });
  };
  const getUserByEmail = async ({ email }: IUser) => {
    return await User.findFirst({
      where: {
        email,
      },
    });
  };
  const updateUserById = async ({ id, email, password, name }: IUser) => {
    return await User.update({
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
    return await User.delete({
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
    getUserByEmail,
  };
};

export default userRepository();
