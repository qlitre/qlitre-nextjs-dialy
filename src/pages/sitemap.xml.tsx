import type { GetServerSidePropsContext } from 'next';
import type { Post } from 'types/blog';
import { getAllContents } from 'libs/getAllContents';
import { config } from 'settings/siteSettings';

async function generateSitemapXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  const posts = await getAllContents()

  posts.forEach((post: Post) => {
    xml += `
      <url>
        <loc>${config.siteUrl}/post/${post.id}</loc>
        <lastmod>${post.updatedAt}</lastmod>
      </url>
    `
  })

  xml += `</urlset>`
  return xml
}

export const getServerSideProps = async ({ res, }: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml()

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

const Page = () => null
export default Page