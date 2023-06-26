"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, FC } from "react";

declare global {
    var adsbygoogle: unknown[];
}

export const GoogleAdSense: FC = () => {
    const pathname = usePathname() ?? "";
    const searchParams = useSearchParams()?.toString();

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error(error);
        }
    }, [pathname, searchParams]);

    return (
        <div key={pathname + searchParams} style={{ textAlign: "center" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-adtest={process.env.NODE_ENV === "production" ? "off" : "on"}
                data-ad-client="ca-pub-7543031846020039"
                data-ad-slot="7499960030"
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};