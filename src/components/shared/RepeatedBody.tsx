import type { Body } from 'types/blog';
import { AmazonLink } from 'components/shared/AmazonLink';
import { MarkdownTemplate } from "components/shared/MarkdownTemplate";

type Props = {
    repeatedBody: Body[];
}

export const RepeatedBody = ({ repeatedBody }: Props) => {
    return (
        <div>
            {repeatedBody.map((body, i) =>
                <div key={i}>
                    {body.fieldId === 'richEditor' ?
                        <MarkdownTemplate source={body.richText} />
                        : <AmazonLink content={{
                            productName: body.productName,
                            productImage: body.productImage,
                            productLink: body.productLink
                        }} />}

                </div>
            )}
        </div>
    );
};