import { client } from 'libs/client'
import type { Post } from 'types/blog'

export const getAllPostsContents = async () => {
    const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
    const totalCount = data.totalCount;
    const maxLimit = 50;
    const loop = Math.ceil(totalCount / maxLimit);
    const promises = [...Array(loop)].map((_, i) => {
        const offset = i * maxLimit;
        return client.getList<Post>({ endpoint: "post", queries: { limit: maxLimit, offset: offset } });
    });
    const results = await Promise.all(promises);
    const contents = results.flatMap((result) => result.contents);
    return contents
}