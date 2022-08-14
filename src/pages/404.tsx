import { SEO } from 'components/molecules/SEO';
import { NotFound } from 'components/pages/NotFound';

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