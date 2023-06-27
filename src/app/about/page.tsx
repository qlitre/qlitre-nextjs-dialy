import { getMetadataWebsite } from 'libs/getMetadataWebsite';
import { About } from 'components/pages/About';

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