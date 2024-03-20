import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    desc: {
      type: String,
      required: true,
      min: 6,
    },
    category: {
      type: String,
      required: true,
      enum: ["Висока", "Середня", "Низька", "Новини"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  { timestamps: true },
);

// Check if the model already exists, and if so, delete it
if (mongoose.models && mongoose.models.Post) {
  delete mongoose.models.Post;
}

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
