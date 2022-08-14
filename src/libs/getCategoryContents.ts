import { client } from 'libs/client'
import { PostCategory } from 'types/blog'

export const getCategoryContents = async () => {
    const data = await client.getList<PostCategory>({ endpoint: "category", queries: { limit: 100 } });
    return data.contents
}