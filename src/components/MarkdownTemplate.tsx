import {
    BoxProps,
    Box,
    Text,
    UnorderedList,
    Heading,
    ListItem,
    Link,
    Code as ChakraCode,
} from "@chakra-ui/react";
import parse, { domToReact, HTMLReactParserOptions } from 'html-react-parser';
import highlight from 'highlight.js';
import 'highlight.js/styles/hybrid.css'

type MarkdownTemplateProps = {
    source: string;
} & BoxProps;

const h1 = {
    component: Text,
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: 1.25,
        fontWeight: "600",
        pb: ".3em",
        fontSize: "2em",
        borderBottom: "1px solid #E7ECF2",
    },
};

const h2 = {
    component: Text,
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: 1.25,
        fontWeight: "600",
        pb: ".3em",
        fontSize: "1.5em",
        borderBottom: "1px solid #E7ECF2",
    },
};

const h3 = {
    component: Text,
    props: {
        mt: "24px",
        mb: "16px",
        lineHeight: 1.25,
        fontWeight: "600",
        fontSize: "1.25em",
    },
};

const p = {
    component: Text,
    props: {
        lineHeight: "1.7",
        mb: "10px",
        fontSize: "18px",
        color: "##000",
    },
};


const ul = {
    component: UnorderedList,
    props: {
        mt: 0,
        mb: 0,
        lineHeight: "1.6",
    },
};

const li = {
    component: ListItem,
    props: {
        mb: "1em",
        fontSize: "18px"
    },
};

const a = {
    component: Link,
    props: {
        isExternal: true,
        textDecoration: "none",
        color: "#0058B3",
        _hover: {
            textDecoration: "none",
            color: "#4593e6",
        },
    },
};

const code = {
    component: Box,
    props: {
        fontSize: 'md',
        pl: "0.2em",
        pr: "0.2em",
        ml: "0.2rem",
        mr: "0.2rem"
    },
}

const preCode = {
    component: ChakraCode,
    props: {
        fontSize: "16px",
    }
}

const languageSubset = ['js', 'html', 'css', 'xml', 'typescript', 'python'];

const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
        if (domNode.type === "tag") {
            if (domNode.name === "h1") {
                return (
                    <Heading as="h1" {...h1.props}>
                        {domToReact(domNode.children, options)}
                    </Heading>
                );
            }
            if (domNode.name === "h2") {
                return (
                    <Heading as="h2" {...h2.props}>
                        {domToReact(domNode.children, options)}
                    </Heading>
                );
            }
            if (domNode.name === "h3") {
                return (
                    <Text as="h3" {...h3.props}>
                        {domToReact(domNode.children, options)}
                    </Text>
                );
            }
            if (domNode.name === "ul") {
                return (
                    <UnorderedList {...ul.props}>
                        {domToReact(domNode.children, options)}
                    </UnorderedList>
                );
            }
            if (domNode.name === "li") {
                return <ListItem {...li.props}>{domToReact(domNode.children, options)}</ListItem>;
            }
            if (domNode.name === "a") {
                return (
                    <Link {...a.props} href={domNode.attribs.href}>
                        {domToReact(domNode.children, options)}
                    </Link>
                );
            }
            if (domNode.name === "p") {
                return (
                    <Text {...p.props}>{domToReact(domNode.children, options)}</Text>
                );
            }
            if (domNode.name === 'code') {
                if (domNode.parent.name === 'pre') {
                    const highlightCode = highlight.highlightAuto(
                        domToReact(domNode.children) as string,
                        languageSubset,
                    ).value;
                    return (
                        <Box as="code" className="hljs" {...preCode.props}>
                            {parse(highlightCode)}
                        </Box>
                    );
                } else {
                    return (
                        <ChakraCode {...code.props}>
                            {domToReact(domNode.children, options)}
                        </ChakraCode>
                    )
                }
            }
        }

    }
}

export const MarkdownTemplate = (props: MarkdownTemplateProps) => {
    return <Box {...props}>{parse(props.source, options)}</Box>;
};