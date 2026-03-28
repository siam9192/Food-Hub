import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { metaService } from "./meta.service.js";

// Admin Access ONLY
const getAllSummariesForProvider: RequestHandler = catchAsync(
  async (_req, res) => {
    const result = await metaService.getAllSummariesForProvider(_req.user!);
    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

export const metaControllers = {
  getAllSummariesForProvider,
};
