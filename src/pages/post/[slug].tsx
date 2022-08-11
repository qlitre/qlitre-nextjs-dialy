import type { GetStaticPaths, GetStaticProps, } from 'next';
import type { Post } from 'types/blog';
import { client } from 'libs/client';
import { SEO } from 'components/molecules/SEO';
import { PostDetailContent } from 'components/pages/PostDetailContent';
import { jstDatetime } from 'utils/utils';
import { isDraft } from 'utils/utils'

type Props = {
  post: Post;
  draftKey: String;
};

export default function Article({ post, draftKey }: Props) {
  const thumbnailUrl = post.thumbnail ? post.thumbnail.url : undefined;
  return (
    <>
      <SEO
        type="article"
        pagePath={`/post/${post.id}`}
        publishedTime={jstDatetime(post.publishedAt)}
        tags={post.tag.map((tag) => tag.name)}
        title={post.title}
        description={post.description}
        thumbnailUrl={thumbnailUrl}
      />
      {draftKey && (
        <div>
          現在プレビューモードで閲覧中です。
        </div>
      )}
      <PostDetailContent post={post} />
    </ >
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // limitがデフォルトで10なので、一旦totalCountを取得してから再度リクエストを投げる
  const data = await client.getList<Post>({ endpoint: "post", queries: { fields: 'id' } });
  const totalCount = data.totalCount;
  const allData = await client.getList<Post>({ endpoint: "post", queries: { limit: totalCount } });
  const paths = allData.contents.map((content) => `/post/${content.id}`);
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params, previewData } = context
  if (!params?.slug) {
    throw new Error('Error: ID not found')
  }
  const slug = String(params.slug);
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {}

  try {
    const data = await client.getListDetail<Post>({
      endpoint: "post",
      contentId: slug,
      queries: {
        ...draftKey
      }
    });
    return {
      props: {
        post: data,
        ...draftKey,
      },
    };
  } catch (e) {
    return { notFound: true }
  }
};