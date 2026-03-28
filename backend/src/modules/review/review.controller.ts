import { RequestHandler } from "express";
import { UserRole } from "../../prisma-output/enums.js";
import { AppError } from "../../errors/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { reviewService } from "./review.service.js";

const createReview: RequestHandler = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new AppError(401, "Unauthorized access");
  }

  if (req.user.role !== UserRole.CUSTOMER) {
    throw new AppError(403, "Only customers can leave reviews");
  }

  const result = await reviewService.createReview(req.user.id, req.body);

  res.status(201).json({
    success: true,
    data: result,
  });
});

const getReviewsByMeal: RequestHandler = catchAsync(async (req, res) => {
  const { mealId } = req.params;
  const result = await reviewService.getReviewsByMeal(mealId as string);

  res.status(200).json({
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviewsByMeal,
};
