import type { Request, Response } from "express";
import prisma from "@repo/db";
const getAllWebsites = async (req: Request, res: Response) => {
  try {
    const website = await prisma.website.findMany();

    return res.status(200).json({
      message: "found all the websites",
      websites: website,
      success: true,
    });
  } catch (error) {
    console.error("error is", error);
    throw error;
  }
};

const GetStatus = async (req: Request, res: Response) => {
  try {
    const websiteId = req.params.id;
    if (!websiteId) {
      res.status(400).json({
        sucess: false,
        message: "websiteId is required to fetch the status",
      });
    }
    const website = prisma.website.findFirst({
      where: {
        id: websiteId,
      },
    });

    if (!website) {
      res
        .status(404)
        .json({ success: false, message: "no entry found with given id" });
    }

    return res.status(200).json({
      success: true,
      message: "website found",
      website: website,
      //   status: website.status,
    });
  } catch (error) {
    console.error("error ", error);
    throw error;
  }
};

export { getAllWebsites, GetStatus };
