import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema = new Schema(
  {
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowecase: true }
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
