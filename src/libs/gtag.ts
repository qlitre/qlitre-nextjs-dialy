import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
    // @ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    // @ts-ignore
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
};

export const useGoogleAnalytics = () => {
    const router = useRouter();

    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;

        const handleRouteChange = (url: URL) => {
            pageview(url);
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);
};