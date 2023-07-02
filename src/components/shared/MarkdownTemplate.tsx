import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import highlight from 'highlight.js';
import { TwitterLinkCard } from 'components/shared/TwitterLinkCard';
import { RichLinkCard } from 'components/shared/RichLinkCard';
import 'highlight.js/styles/hybrid.css';
import styles from "styles/components/shared/MarkdownTemplate.module.scss";

type MarkdownTemplateProps = {
    source: string;
}


const languageSubset = ['js', 'html', 'css', 'xml', 'typescript', 'python', 'plaintext'];

const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
        if (domNode.type === "tag") {
            if (domNode.name === "h1") {
                return (
                    <h1 className={styles.h1}>
                        {domToReact(domNode.children, options)}
                    </h1>
                );
            };
            if (domNode.name === "h2") {
                return (
                    <h2 className={styles.h2}>
                        {domToReact(domNode.children, options)}
                    </h2>
                );
            };
            if (domNode.name === "h3") {
                return (
                    <h3 className={styles.h3}>
                        {domToReact(domNode.children, options)}
                    </h3>
                );
            };
            if (domNode.name === "ul") {
                return (
                    <ul className={styles.list}>
                        {domToReact(domNode.children, options)}
                    </ul>
                );
            };
            if (domNode.name === 'ol') {
                return (
                    <ol className={styles.list}>
                        {domToReact(domNode.children, options)}
                    </ol>
                );
            };
            if (domNode.name === "li") {
                return (
                    <li className={styles.listItem}>
                        {domToReact(domNode.children, options)}
                    </li>
                );
            };
            if (domNode.name === "p") {
                return (
                    <p className={styles.paragraph}>{domToReact(domNode.children, options)}</p>
                );
            };
            if (domNode.name === 'blockquote') {
                if (domNode.attribs.class == 'twitter-tweet') {
                    // microCMSの変換htmlからtwitterURLのIDを取り出す。
                    const twitterHref = domNode.children[2].attribs.href
                    const arr = twitterHref.split('/')
                    const tweetId = arr[arr.length - 1].split('?')[0]
                    return (
                        <div className={styles.twitterEmbed}>
                            <TwitterLinkCard twitterId={tweetId} />
                        </div>
                    )
                }
                return (
                    <blockquote className={styles.blockquote}>
                        {domToReact(domNode.children, options)}
                    </blockquote>
                );
            };
            if (domNode.name === "a") {
                const href = domNode.attribs.href;
                // twitterのリンクは埋め込みを行うので、リンクを表示しない。
                if (/https?:\/\/(www\.)?twitter.com\/\w{1,15}\/status\/.*/.test(href)) return;
                const linkText = domNode.children[0].data;
                return (
                    <RichLinkCard href={domNode.attribs.href} isExternal linkText={linkText} />
                );
            }
            if (domNode.name === 'img') {
                return (
                    <img
                        className={styles.img}
                        src={domNode.attribs.src}
                        alt="image"
                    />
                );
            };

            if (domNode.name === 'iframe') {
                return (
                    <div className={styles.iframeContainer}>
                        <iframe className={styles.iframe} src={domNode.attribs.src}>
                            {domToReact(domNode.children, options)}
                        </iframe>
                    </div>
                )
            };
            if (domNode.name === 'code') {
                if (domNode.parent.name === 'pre') {
                    const highlightCode = highlight.highlightAuto(
                        domToReact(domNode.children) as string,
                        languageSubset
                    ).value;
                    return (
                        <code className={`hljs ${styles.codeBlock} ${domNode.attribs.class}`}>
                            {parse(highlightCode)}
                        </code>
                    );
                }
                return (
                    <code className={styles.inlineCode}>
                        {domToReact(domNode.children, options)}
                    </code>
                );
            };
        };
    }
};


export const MarkdownTemplate = (props: MarkdownTemplateProps) => {
    return <div>{parse(String(props.source), options)}</div>;
};