import { client } from 'libs/client'
import type { Post } from 'types/blog';
import type { MicroCMSQueries } from 'microcms-js-sdk';

export const getPostList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Post>({
        endpoint: "post",
        queries,
    });
    return listData;
}