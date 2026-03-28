const paginationSortingHelper = (options) => {
    const page = Math.max(Number(options.page) || 1, 1);
    const limit = Math.max(Number(options.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy ?? "createdAt";
    const sortOrder = options.sortOrder ?? "desc";
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};
export default paginationSortingHelper;
