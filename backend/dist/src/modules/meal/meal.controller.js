import { DietaryType, UserRole } from "../../prisma-output/enums.js";
import { AppError } from "../../errors/AppError.js";
import paginationSortingHelper from "../../helpers/paginationSortingHelper.js";
import { prisma } from "../../lib/prisma.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { mealService } from "./meal.service.js";
const createMeal = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AppError(401, "Unauthorized access");
    }
    if (req.user.role !== UserRole.PROVIDER) {
        throw new AppError(403, "Only providers can create meals");
    }
    const provider = await prisma.providerProfile.findFirst({
        where: { userId: req.user.id },
    });
    if (!provider) {
        throw new AppError(400, "Provider profile not found");
    }
    const result = await mealService.createMeal(req.body, provider.id);
    res.status(201).json({
        success: true,
        data: result,
    });
});
const getSingleMeal = catchAsync(async (req, res) => {
    const { mealId } = req.params;
    if (!mealId) {
        throw new AppError(400, "Meal ID is required");
    }
    const result = await mealService.getSingleMeal(mealId);
    if (!result) {
        throw new AppError(404, "Meal not found");
    }
    res.status(200).json({
        success: true,
        data: result,
    });
});
const getAllMeals = catchAsync(async (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    let isAvailable;
    if (typeof req.query.isAvailable === "string") {
        if (req.query.isAvailable === "true")
            isAvailable = true;
        if (req.query.isAvailable === "false")
            isAvailable = false;
    }
    const providerId = typeof req.query.providerId === "string" ? req.query.providerId : undefined;
    const categoryId = typeof req.query.categoryId === "string" ? req.query.categoryId : undefined;
    const dietaryPreference = typeof req.query.dietaryType === "string" &&
        Object.values(DietaryType).includes(req.query.dietaryType)
        ? req.query.dietaryType
        : undefined;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);
    const result = await mealService.getAllMeals({
        search,
        categoryId,
        providerId,
        dietaryPreference,
        isAvailable,
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    });
    res.status(200).json({
        success: true,
        data: result,
    });
});
export const mealController = {
    createMeal,
    getSingleMeal,
    getAllMeals,
};
