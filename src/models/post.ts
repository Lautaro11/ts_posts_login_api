import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String},
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    image: String,
  },
  { timestamps: true }
);

export default model("Post", PostSchema);
