import { AppError } from "../../errors/AppError.js";
import slugify from "../../helpers/slugify.js";
import { prisma } from "../../lib/prisma.js";
const createCategory = async (data) => {
    if (!data.name) {
        throw new AppError(400, "Category name is required");
    }
    const slug = slugify(data.name);
    const existingCategory = await prisma.category.findFirst({
        where: {
            OR: [{ name: data.name }, { slug }],
        },
    });
    if (existingCategory) {
        throw new AppError(409, "Category already exists");
    }
    const result = await prisma.category.create({
        data: {
            name: data.name,
            slug,
        },
    });
    return result;
};
const getAllCategories = async () => {
    const result = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const updateCategory = async (categoryId, data) => {
    if (!categoryId) {
        throw new AppError(400, "Category ID is required");
    }
    const updateData = { ...data };
    // Auto-update slug if name changes
    if (data.name) {
        updateData.slug = slugify(data.name);
    }
    return prisma.category.update({
        where: { id: categoryId },
        data: updateData,
    });
};
const deleteCategory = async (categoryId) => {
    return prisma.category.delete({
        where: { id: categoryId },
    });
};
export const categoryService = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
