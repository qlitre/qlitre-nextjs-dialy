export const BLOG_PER_PAGE = 10;

export const config = {
    siteTitle: "QLITRE DIALY",
    siteUrl: process.env.NODE_ENV === 'production'
        ? 'https://www.qlitre-dialy.ink'
        : 'http://localhost:3000',
    siteDescription: "日曜プログラマーの自作日記サイトです。面白かった本や良い音楽の紹介をしています。",
    repository: "https://github.com/qlitre/qlitre-nextjs-dialy",
    github: "https://github.com/qlitre",
    twitterTop: "https://twitter.com/kuri_tter",
    twitterAccount: "kuri_tter",
    buyMeACoffee: "https://www.buymeacoffee.com/qlitre",
    social: {
        twitter: "kuri_tter",
    },
    excerptLength: 160,
};