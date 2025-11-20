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
"[project]/src/config/wordpress.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WORDPRESS_CONFIG",
    ()=>WORDPRESS_CONFIG,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const WORDPRESS_CONFIG = {
    API_BASE: 'https://primeiranews.com.br/wp-json/wp/v2',
    SITE_URL: 'https://primeiranews.com.br',
    CACHE_TTL: {
        POSTS_LIST: 0,
        POST_SINGLE: 0,
        CATEGORIES: 7 * 24 * 60 * 60 * 1000,
        TAGS: 7 * 24 * 60 * 60 * 1000,
        MEDIA: 7 * 24 * 60 * 60 * 1000
    },
    PAGINATION: {
        PER_PAGE: 10,
        MAX_PAGES: 100
    },
    FIELDS: {
        POSTS: 'id,title,excerpt,content,date,link,categories,featured_media,author',
        CATEGORIES: 'id,name,slug,count,description',
        TAGS: 'id,name,slug,count',
        MEDIA: 'id,title,media_details,source_url'
    }
};
const __TURBOPACK__default__export__ = WORDPRESS_CONFIG;
}),
"[project]/src/server/wordpress.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCategoryIdBySlug",
    ()=>getCategoryIdBySlug,
    "getCategoryPostsCacheControl",
    ()=>getCategoryPostsCacheControl,
    "getPostBySlug",
    ()=>getPostBySlug,
    "getPostSingleCacheControl",
    ()=>getPostSingleCacheControl,
    "getPosts",
    ()=>getPosts,
    "getPostsByCategoryId",
    ()=>getPostsByCategoryId,
    "getPostsByCategorySlug",
    ()=>getPostsByCategorySlug,
    "getPostsListCacheControl",
    ()=>getPostsListCacheControl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/wordpress.ts [app-route] (ecmascript)");
;
;
const WP_API_URL = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].API_BASE;
const msToSeconds = (ms)=>{
    if (ms <= 0) return 0;
    return Math.max(1, Math.floor(ms / 1000));
};
const createCacheControlHeader = (ttlMs)=>{
    if (ttlMs <= 0) {
        return 'no-store';
    }
    const seconds = msToSeconds(ttlMs);
    return `public, s-maxage=${seconds}, stale-while-revalidate=${seconds}`;
};
async function wpFetchJson(url, ttlMs) {
    const seconds = msToSeconds(ttlMs);
    const init = {
        headers: {
            Accept: 'application/json'
        }
    };
    if (ttlMs <= 0) {
        init.cache = 'no-store';
    } else {
        init.next = {
            revalidate: seconds
        };
    }
    const response = await fetch(url, init);
    if (!response.ok) {
        throw new Error(`WordPress HTTP ${response.status}: ${response.statusText}`);
    }
    const text = await response.text();
    if (!text) {
        throw new Error('Empty response from WordPress');
    }
    return JSON.parse(text);
}
function withCategoryNames(posts) {
    return posts.map((post)=>{
        const categories_names = post._embedded?.['wp:term']?.[0]?.map((cat)=>cat.name) || [];
        return {
            ...post,
            categories_names
        };
    });
}
async function getPosts(perPage, page) {
    const url = `${WP_API_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    const data = await wpFetchJson(url, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POSTS_LIST);
    return withCategoryNames(data);
}
const normalizeText = (value)=>{
    return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
};
async function getCategoryIdBySlug(slug) {
    const exactUrl = `${WP_API_URL}/categories?slug=${encodeURIComponent(slug)}`;
    const exact = await wpFetchJson(exactUrl, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.CATEGORIES);
    if (Array.isArray(exact) && exact.length > 0) {
        return exact[0].id ?? null;
    }
    const searchUrl = `${WP_API_URL}/categories?search=${encodeURIComponent(slug)}`;
    const cats = await wpFetchJson(searchUrl, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.CATEGORIES);
    if (!Array.isArray(cats) || cats.length === 0) {
        return null;
    }
    const norm = normalizeText(slug);
    const best = cats.find((c)=>normalizeText(c.slug) === norm) ?? cats.find((c)=>normalizeText(c.name).includes(norm));
    return best ? best.id : cats[0].id ?? null;
}
async function getPostsByCategoryId(categoryId, perPage, page) {
    const url = `${WP_API_URL}/posts?_embed&categories=${categoryId}&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
    const data = await wpFetchJson(url, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POSTS_LIST);
    return withCategoryNames(data);
}
async function getPostsByCategorySlug(slug, perPage, page) {
    const categoryId = await getCategoryIdBySlug(slug);
    if (!categoryId) {
        return [];
    }
    return getPostsByCategoryId(categoryId, perPage, page);
}
async function getPostBySlug(slug) {
    const url = `${WP_API_URL}/posts?_embed&slug=${encodeURIComponent(slug)}`;
    const data = await wpFetchJson(url, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POST_SINGLE);
    if (!Array.isArray(data) || data.length === 0) {
        return null;
    }
    const [post] = data;
    const [postWithCategories] = withCategoryNames([
        post
    ]);
    return postWithCategories;
}
const getPostsListCacheControl = ()=>createCacheControlHeader(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POSTS_LIST);
const getPostSingleCacheControl = ()=>createCacheControlHeader(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POST_SINGLE);
const getCategoryPostsCacheControl = ()=>createCacheControlHeader(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WORDPRESS_CONFIG"].CACHE_TTL.POSTS_LIST);
}),
"[project]/app/api/posts/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/wordpress.ts [app-route] (ecmascript)");
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const perPageParam = searchParams.get('perPage') ?? '10';
    const pageParam = searchParams.get('page') ?? '1';
    const categorySlug = searchParams.get('categorySlug') ?? undefined;
    const perPage = Number(perPageParam);
    const page = Number(pageParam);
    const safePerPage = Number.isFinite(perPage) && perPage > 0 ? perPage : 10;
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    try {
        const posts = categorySlug ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostsByCategorySlug"])(categorySlug, safePerPage, safePage) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPosts"])(safePerPage, safePage);
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$wordpress$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPostsListCacheControl"])()
            }
        });
    } catch (error) {
        console.error('Error in /api/posts', error);
        return new Response(JSON.stringify({
            error: 'Falha ao carregar notícias.'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'private, no-store'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__46d0ae2c._.js.map