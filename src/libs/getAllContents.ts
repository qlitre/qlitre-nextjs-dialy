import { client } from 'libs/client'
import { Post } from 'types/blog'

export const getAllContents = async () => {
    const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
    const totalCount = data.totalCount;
    const allData = await client.getList<Post>({ endpoint: "post", queries: { limit: totalCount } });
    return allData.contents
}