import IUser from "../interfaces/user";
import User from "../models/user";

const getUser = async (
  id: String,
  callback: (error: Error | null, user: Object | null) => void
): Promise<void> => {
  try {
    const user = await User.findOne({ _id: id });
    return callback(null, user);
  } catch (error) {
    return callback(new Error("User does not exist"), null);
  }
};

export default getUser;
