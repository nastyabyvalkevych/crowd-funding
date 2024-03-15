"use server";

import { connectDB } from "@/db/config";
import { getCurrentUserDataFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import CampaignModel from "@/models/campaign";
import mongoose from "mongoose";
import DonationModal from "@/models/donation";

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

export const editCampaign = async (reqBody: any) => {
  try {
    await CampaignModel.findOneAndUpdate(
      { _id: reqBody._id },
      { $set: reqBody },
    );
    revalidatePath(`/admin/campaigns/edit-campaign/${reqBody._id}`);
    return {
      message: "Кампанію успішно оновлено!",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteCampaign = async (id: string) => {
  try {
    await CampaignModel.findByIdAndDelete(id);
    revalidatePath(`/admin/campaigns`);
    return {
      message: "Кампанію успішно видалено!",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getCampaignReportsById = async (id: string) => {
  try {
    const campaignIdInObjectFormat = new mongoose.Types.ObjectId(id);
    let [donationsCount, totalAmountRaised, donations] = await Promise.all([
      DonationModal.countDocuments({ campaign: id }),
      DonationModal.aggregate([
        {
          $match: {
            campaign: campaignIdInObjectFormat,
          },
        },
        {
          $group: {
            _id: null,
            totalAmountRaised: {
              $sum: "$amount",
            },
          },
        },
      ]),
      DonationModal.find({ campaign: id })
        .populate("user")
        .sort({ createdAt: -1 }),
    ]);

    totalAmountRaised = totalAmountRaised[0]?.totalAmountRaised || 0;
    return {
      data: {
        donationsCount,
        totalAmountRaised,
        donations: JSON.parse(JSON.stringify(donations)),
      },
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
