import { getAllPostsContents } from "libs/getAllPostsContents";

export const getReferencedTagCount = async () => {
    const allContents = await getAllPostsContents();
    const tagCount: Record<string, number> = {};
    for (const post of allContents) {
        for (const tag of post.tag) {
            if (tagCount[tag.id]) {
                tagCount[tag.id] += 1;
            } else {
                tagCount[tag.id] = 1;
            }
        }
    }
    return tagCount;
}