"use client";

import { Partytown } from "@qwik.dev/partytown/react";

const GA_MEASUREMENT_ID = "G-6L64WDYYKH";

export default function GoogleAnalyticsPartytown() {
    return (
        <>
            {/* Partytown config - forward dataLayer.push para o worker */}
            <Partytown
                debug={process.env.NODE_ENV === "development"}
                forward={["dataLayer.push", "gtag"]}
            />

            {/* Google Analytics gtag.js - roda no Web Worker */}
            <script
                type="text/partytown"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />

            {/* Config do GA - roda no Web Worker */}
            <script
                type="text/partytown"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}
