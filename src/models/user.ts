import { Schema, model } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema = new Schema(
  {
    password: { type: String, required: true, minLength: 8 },
    username: { type: String, required: true, unique: true, lowecase: true, minLength: 1 },
    description: { type: String, maxLength: 50 }
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
