"use server";

import { connectDB } from "@/db/config";
import { getCurrentUserDataFromMongoDB } from "./users";
import CampaignModel from "@/models/campaign";
import DonationModel from "@/models/donation";
import { revalidatePath } from "next/cache";

connectDB();

export const addNewDonation = async (reqBody: any) => {
  try {
    const mongoUser = await getCurrentUserDataFromMongoDB();
    reqBody.user = mongoUser?.data?._id;
    const newDonation = new DonationModel(reqBody);
    await newDonation.save();

    const campaign = (await CampaignModel.findById(reqBody.campaign)) as any;
    campaign.collectedAmount += reqBody.amount;
    await campaign.save();
    revalidatePath(`/campaigns/${campaign._id}`);
    revalidatePath(`/profile/donations`);
    return {
      success: true,
      message: "Донат успішно додано",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getDonationsByCampaignId = async (campaignId: string) => {
  try {
    const donations = await DonationModel.find({
      campaign: campaignId,
    }).populate("user");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(donations)),
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getTopDonators = async () => {
  try {
    const topDonators = await DonationModel.aggregate([
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          userName: { $arrayElemAt: ["$userData.userName", 0] },
          totalAmount: 1,
        },
      },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
    ]);

    const topDonatorsData = topDonators.map((donator) => ({
      userName: donator.userName,
      totalAmount: donator.totalAmount,
    }));

    return {
      success: true,
      data: topDonatorsData,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
