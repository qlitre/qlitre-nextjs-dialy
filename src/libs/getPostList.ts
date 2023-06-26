import { client } from './client'
import { Post } from 'types/blog';
import { MicroCMSQueries } from 'microcms-js-sdk';

export const getPostList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Post>({
        endpoint: "post",
        queries,
    });
    return listData;
}