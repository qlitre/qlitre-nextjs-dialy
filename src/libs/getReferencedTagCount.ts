import { getAllContents } from "libs/getAllContents";

export const getReferencedTagCount = async () => {
    const allContents = await getAllContents();
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