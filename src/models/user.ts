import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowecase: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
  },
  { timestamps: true }
);

export default model("User", UserSchema);
