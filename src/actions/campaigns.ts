"use server";

import { connectDB } from "@/db/config";
import { getCurrentUserDataFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import CampaignModel from "@/models/campaign";

connectDB();

export const addNewCampaign = async (reqBody: any) => {
  try {
    const currentUser = await getCurrentUserDataFromMongoDB();
    reqBody.createdBy = currentUser?.data?._id;
    const campaign = new CampaignModel(reqBody);
    await campaign.save();
    revalidatePath(`/admin/campaigns`);
    return {
      message: "Кампанію успішно додано!",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

