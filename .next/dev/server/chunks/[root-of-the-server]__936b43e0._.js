module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/twitter/trends/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
const BRAZIL_WOEID = 23424768;
function formatTweetCount(count) {
    if (!count || count <= 0) return 'N/A';
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
}
async function fetchFromTwitterApi() {
    const bearer = process.env.TWITTER_BEARER_TOKEN;
    if (!bearer) {
        return null;
    }
    try {
        const response = await fetch(`https://api.twitter.com/1.1/trends/place.json?id=${BRAZIL_WOEID}`, {
            headers: {
                Authorization: `Bearer ${bearer}`
            }
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        if (!Array.isArray(data) || !data[0] || !Array.isArray(data[0].trends)) {
            return null;
        }
        const trends = data[0].trends.slice(0, 7).map((trend)=>({
                tag: trend.name,
                tweets: formatTweetCount(trend.tweet_volume ?? null),
                url: `https://twitter.com/search?q=${encodeURIComponent(trend.name)}`
            }));
        return trends;
    } catch  {
        return null;
    }
}
async function fetchFromGetDayTrends() {
    try {
        const response = await fetch('https://getdaytrends.com/brazil/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
            }
        });
        if (!response.ok) {
            return null;
        }
        const html = await response.text();
        const regex = /<td class="main"><a[^>]*>([^<]+)<\/a>/g;
        const names = [];
        let match;
        while((match = regex.exec(html)) !== null){
            names.push(match[1].trim());
            if (names.length >= 10) break;
        }
        if (names.length === 0) {
            return null;
        }
        const trends = names.map((name)=>({
                tag: name,
                tweets: 'N/A',
                url: `https://twitter.com/search?q=${encodeURIComponent(name)}`
            }));
        return trends;
    } catch  {
        return null;
    }
}
function getFallbackTrends() {
    return [
        {
            tag: '#Brasil',
            tweets: '127K',
            url: 'https://twitter.com/search?q=%23Brasil'
        },
        {
            tag: '#Política',
            tweets: '89K',
            url: 'https://twitter.com/search?q=%23Pol%C3%ADtica'
        },
        {
            tag: '#Economia',
            tweets: '56K',
            url: 'https://twitter.com/search?q=%23Economia'
        },
        {
            tag: '#Esportes',
            tweets: '142K',
            url: 'https://twitter.com/search?q=%23Esportes'
        },
        {
            tag: '#Tecnologia',
            tweets: '34K',
            url: 'https://twitter.com/search?q=%23Tecnologia'
        }
    ];
}
async function GET() {
    try {
        let trends = await fetchFromTwitterApi();
        if (!trends) {
            trends = await fetchFromGetDayTrends();
        }
        if (!trends) {
            trends = getFallbackTrends();
        }
        return new Response(JSON.stringify(trends), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });
    } catch  {
        const trends = getFallbackTrends();
        return new Response(JSON.stringify(trends), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__936b43e0._.js.map