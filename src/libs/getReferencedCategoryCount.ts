import { getAllPostsContents } from "libs/getAllPostsContents";

export const getReferencedCategoryCount = async () => {
    const allContents = await getAllPostsContents();
    const categoryCount: Record<string, number> = {};
    for (const post of allContents) {
        if (post.category) {
            if (categoryCount[post.category.id]) {
                categoryCount[post.category.id] += 1;
            } else {
                categoryCount[post.category.id] = 1;
            }
        }
    }
    return categoryCount;
}