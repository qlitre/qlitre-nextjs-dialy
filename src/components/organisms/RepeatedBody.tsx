import type { Body } from 'types/blog';
import { AmazonLink } from 'components/molecules/AmazonLink';
import { MarkdownTemplate } from 'components/organisms/MarkdownTemplate';
import { Box } from '@chakra-ui/react';

type Props = {
    repeatedBody: Body[];
}

export const RepeatedBody = ({ repeatedBody }: Props) => {
    return (
        <Box>
            {repeatedBody.map((body, i) =>
                <Box key={i} mb="16">
                    {body.fieldId === 'richEditor' ?
                        <MarkdownTemplate source={body.richText} />
                        : <AmazonLink content={{
                            productName: body.productName,
                            productImage: body.productImage,
                            productLink: body.productLink
                        }} />}

                </Box>
            )}
        </Box>
    );
};