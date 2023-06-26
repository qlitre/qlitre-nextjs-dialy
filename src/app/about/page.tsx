import { About } from 'components/pages/About';
import { getMetadataWebsite } from 'libs/getMetadataWebsite';

export default async function StaticAbout() {
    return (
        <>
            <About />
        </>
    )
}

export const metadata = getMetadataWebsite({
    pagePath: `/about`,
    title: `ABOUT`,
    description: `QlitreのABOUTページ`
})