import { NotFound } from 'components/common/NotFound';
import { SEO } from 'components/common/SEO';

const Custom404 = () => {
    return (
        <>
            <SEO
                type="website"
                pagePath="/404"
                noindex
                title="Not found"
                description="指定されたページが見つかりませんでした"
            />
            <NotFound />
        </>
    );
};

export default Custom404;