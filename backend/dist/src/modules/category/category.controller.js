import { AppError } from "../../errors/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { categoryService } from "./category.service.js";
import { UserRole } from "../../prisma-output/enums.js";
const createCategory = catchAsync(async (req, res) => {
    if (!req.user) {
        throw new AppError(401, "Unauthorized access");
    }
    if (req.user.role !== UserRole.ADMIN) {
        throw new AppError(403, "Only admin can create categories");
    }
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
        success: true,
        data: result,
    });
});
const getAllCategories = catchAsync(async (req, res) => {
    const result = await categoryService.getAllCategories();
    res.status(200).json({
        success: true,
        data: result,
    });
});
const updateCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const result = await categoryService.updateCategory(categoryId, req.body);
    res.status(200).json({
        success: true,
        data: result,
    });
});
const deleteCategory = catchAsync(async (req, res) => {
    const { categoryId } = req.params;
    const result = await categoryService.deleteCategory(categoryId);
    res.status(200).json({
        success: true,
        data: result,
    });
});
export const categoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
