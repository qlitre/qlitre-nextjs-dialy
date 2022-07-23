export const BLOG_PER_PAGE = 10;
export const config = {
    siteTitle: "QLITRE DIALY",
    siteUrl: process.env.NODE_ENV === 'production'
        ? 'https://www.qlitre-dialy.ink'
        : 'http://localhost:3000',
    repository: "https://github.com/qlitre/qlitre-nextjs-dialy",
    social: {
        twitter: "kuri_tter",
    },
    excerptLength: 160,
};