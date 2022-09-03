import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, lowecase: true },
    content: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    image: String,
  },
  { timestamps: true }
);

export default model("Post", PostSchema);
