import { client } from 'libs/client'
import type { PostCategory } from 'types/blog'

export const getCategoryList = async () => {
    const listData = await client.getList<PostCategory>({ endpoint: "category", queries: { limit: 50 } });
    return listData.contents
}