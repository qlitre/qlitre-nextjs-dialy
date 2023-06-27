import { MetadataRoute } from "next";
import { getAllPostsContents } from "libs/getAllPostsContents";
import { config } from "settings/siteSettings"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = config.siteUrl;
  const lastModified = new Date();

  const staticPaths = [
    {
      url: `${baseUrl}`,
      lastModified,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
    },
  ];
  const allPosts = await getAllPostsContents();
  for (const post of allPosts) {
    const elm = {
      url: `${baseUrl}/post/${post.id}}`,
      lastModified,
    }
    staticPaths.push(elm)
  }

  return staticPaths;
}