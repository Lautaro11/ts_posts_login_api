import jwt from "jsonwebtoken";
import IUser from "../interfaces/user";
require("dotenv").config();

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  try {
    jwt.sign(
      {
        iat: Math.floor(Date.now() / 1000) - 30,
        id: user._id.toString(),
        username: user.username,
      },
      process.env.JWT_SECRET?.toString() || "theSecret",
      { expiresIn: `${Number(process.env.SERVER_TOKEN_EXPIRETIME)}h` }, //time represented in hours
      (error, token) => {
        if (error) {
          console.log(error);
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
        console.log("JWT", error, token);
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      callback(error, null);
    } else {
      callback(new Error("Unexpected error"), null);
    }
  }
};

export default signJWT;
