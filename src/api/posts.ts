"use server";

import { connectDB } from "@/db/config";
import { getCurrentUserDataFromMongoDB } from "./users";
import PostModel from "@/models/post";
import UserModel from "@/models/user";

connectDB();

export const addNewPost = async (reqBody: any) => {
  try {
    const currentUser = await getCurrentUserDataFromMongoDB();
    const clerkUserId = currentUser?.data?.clerkUserId;

    if (!clerkUserId) {
      throw new Error("Clerk user ID not found");
    }

    const user = await UserModel.findOne({ clerkUserId });

    if (!user) {
      throw new Error("User not found");
    }

    reqBody.authorId = user._id;

    const post = new PostModel(reqBody);
    await post.save();

    return {
      message: "Пост успешно добавлен!",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deletePost = async (id: string) => {
  try {
    await PostModel.findByIdAndDelete(id);
    return {
      message: "Пост успішно видалено!",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};