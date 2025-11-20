(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67585,(e,s,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let a=e.r(32061);function r({reason:e,children:s}){if("undefined"==typeof window)throw Object.defineProperty(new a.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return s}},9885,(e,s,t)=>{"use strict";function a(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"encodeURIPath",{enumerable:!0,get:function(){return a}})},52157,(e,s,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadChunks",{enumerable:!0,get:function(){return l}});let a=e.r(43476),r=e.r(74080),i=e.r(63599),o=e.r(9885);function l({moduleIds:e}){if("undefined"!=typeof window)return null;let s=i.workAsyncStorage.getStore();if(void 0===s)return null;let t=[];if(s.reactLoadableManifest&&e){let a=s.reactLoadableManifest;for(let s of e){if(!a[s])continue;let e=a[s].files;t.push(...e)}}return 0===t.length?null:(0,a.jsx)(a.Fragment,{children:t.map(e=>{let t=`${s.assetPrefix}/_next/${(0,o.encodeURIPath)(e)}`;return e.endsWith(".css")?(0,a.jsx)("link",{precedence:"dynamic",href:t,rel:"stylesheet",as:"style",nonce:s.nonce},e):((0,r.preload)(t,{as:"script",fetchPriority:"low",nonce:s.nonce}),null)})})}},69093,(e,s,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let a=e.r(43476),r=e.r(71645),i=e.r(67585),o=e.r(52157);function l(e){return{default:e&&"default"in e?e.default:e}}let n={loader:()=>Promise.resolve(l(()=>null)),loading:null,ssr:!0},d=function(e){let s={...n,...e},t=(0,r.lazy)(()=>s.loader().then(l)),d=s.loading;function c(e){let l=d?(0,a.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,n=!s.ssr||!!s.loading,c=n?r.Suspense:r.Fragment,x=s.ssr?(0,a.jsxs)(a.Fragment,{children:["undefined"==typeof window?(0,a.jsx)(o.PreloadChunks,{moduleIds:s.modules}):null,(0,a.jsx)(t,{...e})]}):(0,a.jsx)(i.BailoutToCSR,{reason:"next/dynamic",children:(0,a.jsx)(t,{...e})});return(0,a.jsx)(c,{...n?{fallback:l}:{},children:x})}return c.displayName="LoadableComponent",c}},70703,(e,s,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}});let a=e.r(55682)._(e.r(69093));function r(e,s){let t={};"function"==typeof e&&(t.loader=e);let r={...t,...s};return(0,a.default)({...r,modules:r.loadableGenerated?.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),s.exports=t.default)},31713,e=>{"use strict";var s=e.i(43476),t=e.i(71645),a=e.i(18566),r=e.i(70703),i=e.i(5766),o=e.i(45646),l=e.i(59228),n=e.i(82693),d=e.i(8034),c=e.i(75254);let x=(0,c.default)("instagram",[["rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5",key:"2e1cvw"}],["path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",key:"9exkf1"}],["line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5",key:"r4j83e"}]]);var h=e.i(83157);let u=(0,c.default)("youtube",[["path",{d:"M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",key:"1q2vi4"}],["path",{d:"m10 15 5-3-5-3z",key:"1jp15x"}]]);function m(){return(0,s.jsx)("header",{className:"header-pn",children:(0,s.jsx)("div",{className:"max-w-7xl mx-auto px-4 py-2",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex flex-col",children:[(0,s.jsxs)("a",{href:"https://primeiranews.com",className:"flex items-center space-x-3 hover:opacity-80 transition-opacity",children:[(0,s.jsx)("div",{className:"logo-icon-pn",children:"PN"}),(0,s.jsxs)("h1",{className:"text-6xl font-bold",style:{fontFamily:"'Roboto Condensed', sans-serif",fontWeight:700},children:[(0,s.jsx)("span",{className:"text-gray-900",children:"Primeira"}),(0,s.jsx)("span",{className:"text-sky-600",children:"News"})]})]}),(0,s.jsx)("p",{className:"text-xl text-gray-600 ml-20",style:{fontFamily:"'Roboto Condensed', sans-serif"},children:"Notícias imparciais de política, economia e mundo"})]}),(0,s.jsxs)("div",{className:"flex items-center gap-4",children:[(0,s.jsx)("a",{href:"#",className:"text-gray-700 hover:text-sky-600 transition-colors",children:(0,s.jsx)(x,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"text-gray-700 hover:text-sky-600 transition-colors",children:(0,s.jsx)(h.Facebook,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"text-gray-700 hover:text-sky-600 transition-colors",children:(0,s.jsx)(u,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"text-gray-700 hover:text-sky-600 transition-colors",children:(0,s.jsx)("svg",{className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})})]})]})})})}let p=(0,c.default)("house",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]]),g=(0,c.default)("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]),b=(0,c.default)("shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]),f=(0,c.default)("folder-open",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]),v=(0,c.default)("file-text",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]),j=(0,c.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),y=[{icon:p,label:"INÍCIO"},{icon:g,label:"QUEM SOMOS"},{icon:b,label:"POLÍTICA DE PRIVACIDADE"},{icon:f,label:"CATEGORIAS"},{icon:v,label:"ARTIGOS"}];function w(){return(0,s.jsx)("nav",{className:"bg-black text-white sticky top-0 z-40 border-b border-gray-800",children:(0,s.jsx)("div",{className:"max-w-7xl mx-auto px-4",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)("div",{className:"flex items-center space-x-1 overflow-x-auto py-0",children:y.map(e=>{let t=e.icon,a="INÍCIO"===e.label;return(0,s.jsxs)(a?"a":"button",{...a?{href:"https://primeiranews.com"}:{},className:"flex items-center space-x-2 whitespace-nowrap px-4 py-3 text-sm font-medium hover:bg-gray-900 hover:text-sky-400 transition-all duration-300 relative group",children:[(0,s.jsx)(t,{className:"w-4 h-4"}),(0,s.jsx)("span",{children:e.label}),(0,s.jsx)("div",{className:"absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-sky-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"})]},e.label)})}),(0,s.jsx)("button",{className:"p-2 hover:bg-gray-900 rounded-lg transition-colors",children:(0,s.jsx)(j,{className:"w-5 h-5 text-white"})})]})})})}var N=e.i(80401);e.i(41983);var k=e.i(72225),P=e.i(86301),C=e.i(79053),M=e.i(15208),M=M,S=e.i(82580),S=S,z=e.i(73712),z=z;function O({posts:e,onPostClick:a}){let[r,i]=(0,t.useState)(!1),[n,d]=(0,t.useState)(null),[c,x]=(0,t.useState)(null),[h,u]=(0,t.useState)(0);return((0,t.useEffect)(()=>{u(0)},[e]),(0,t.useEffect)(()=>{i(!0)},[e]),r&&0!==e.length)?(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("style",{children:`
        @keyframes carousel-border-glow {
          0%, 100% {
            border-color: rgba(30, 58, 138, 0.6);
            box-shadow: 0 0 12px rgba(30, 58, 138, 0.4);
          }
          50% {
            border-color: rgba(30, 58, 138, 1);
            box-shadow: 0 0 20px rgba(30, 58, 138, 0.8);
          }
        }
        .carousel-animated-border {
          border: 2px solid rgba(30, 58, 138, 0.6) !important;
          animation: carousel-border-glow 3s ease-in-out infinite;
        }
        .carousel-slide-hover:hover picture,
        .carousel-slide-hover:hover img {
          transform: scale(1.05);
          transition: transform 0.6s ease-out;
        }
      `}),(0,s.jsx)("div",{className:"rounded-lg overflow-hidden transition-all duration-300 carousel-animated-border",children:(0,s.jsx)(N.Swiper,{modules:[k.Autoplay,P.Pagination,C.Navigation,M.default,S.default],onSwiper:x,effect:"fade",fadeEffect:{crossFade:!0},spaceBetween:0,slidesPerView:1,autoplay:{delay:8e3,disableOnInteraction:!1},pagination:{clickable:!0,el:".news-carousel-pagination"},navigation:!0,loop:!1,watchOverflow:!0,thumbs:n?{swiper:n}:void 0,onSlideChange:e=>u(e.activeIndex),className:"h-[420px]",children:e.map(e=>(0,s.jsx)(N.SwiperSlide,{children:(0,s.jsx)("div",{onClick:()=>a?.(e.id),className:"block h-full cursor-pointer carousel-slide-hover",children:(0,s.jsxs)("div",{className:"relative h-full w-full group cursor-pointer overflow-hidden",children:[(0,s.jsx)(o.default,{src:(0,l.getPostImage)(e).replace(/^https?:\/\/[^\/]+/,"")||"/placeholder.jpg",alt:(0,l.getPostTitle)(e),ratio:"none",priority:"high",usePicture:!0,style:{filter:"brightness(120%)",width:"100%",height:"100%"},className:"h-full w-full object-cover"}),(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),(e.categories_names&&e.categories_names.length>0||e.categories&&e.categories.length>0)&&(0,s.jsx)("div",{className:"absolute top-4 left-4 bg-sky-700 text-white px-2.5 py-1 text-xs font-semibold uppercase z-20",children:e.categories_names?e.categories_names.find(e=>"notícias"!==e.toLowerCase()&&"noticias"!==e.toLowerCase())||e.categories_names[0]:`Cat ${e.categories?.filter(e=>1!==e)[0]||e.categories?.[0]||""}`}),(0,s.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 p-6",children:[(0,s.jsx)("div",{className:"absolute inset-x-0 inset-y-4 bg-black/40 backdrop-blur-sm"}),(0,s.jsx)("h2",{className:"relative z-10 text-white text-2xl font-bold leading-tight line-clamp-2 group-hover:text-fundo-card transition-colors duration-300",style:{textShadow:"2px 2px 4px rgba(0, 0, 0, 0.9)"},children:(0,l.getPostTitle)(e)})]})]})})},e.id))})}),(0,s.jsx)("div",{className:"mt-3",children:(0,s.jsx)(N.Swiper,{modules:[z.default,S.default],onSwiper:d,spaceBetween:8,slidesPerView:Math.min(6,Math.max(1,e.length)),freeMode:!0,watchSlidesProgress:!0,watchOverflow:!0,className:"thumbs-swiper",children:e.map((e,t)=>(0,s.jsx)(N.SwiperSlide,{children:(0,s.jsx)("div",{className:"h-16 w-full overflow-hidden rounded-md transition-all duration-300 group hover:scale-105 hover:z-10 cursor-pointer",onClick:()=>{c&&c.slideToLoop(t,300)},children:(0,s.jsx)("div",{className:`h-full w-full overflow-hidden rounded-md border-[3px] transition-all duration-300 ${h===t?"border-blue-300 shadow-lg":"border-white/20"} group-hover:border-blue-200 group-hover:shadow-xl`,style:{backgroundImage:`url(${(0,l.getPostImage)(e)})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",opacity:h===t?1:.6,transition:"all 300ms"},onMouseEnter:e=>e.currentTarget.style.opacity="1",onMouseLeave:e=>e.currentTarget.style.opacity=h===t?"1":"0.6"})})},`thumb-${e.id}`))})}),(0,s.jsx)("div",{className:"news-carousel-pagination flex justify-center mt-4 gap-2"})]}):(console.log(`[DEBUG] NewsCarousel posts length: ${e.length}`),(0,s.jsx)("div",{className:"bg-fundo-destaque rounded-lg h-[320px] animate-pulse flex items-center justify-center shadow-card",children:(0,s.jsx)("p",{className:"text-texto-terciario",children:"Carregando notícias..."})}))}var L=e.i(25652);function T({posts:e,title:t,onPostClick:a}){return(0,s.jsx)("aside",{className:"h-full",children:(0,s.jsxs)("div",{className:"bg-texto-principal rounded-lg shadow-card p-4 h-full border-2 border-gray-700",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2 mb-4",children:[(0,s.jsx)(L.TrendingUp,{className:"w-5 h-5 text-categoria-default"}),(0,s.jsx)("h2",{className:"text-xl font-bold text-fundo-card",children:t})]}),(0,s.jsx)("div",{className:"space-y-4",children:e.map((e,t)=>(0,s.jsxs)("div",{onClick:()=>a?.(e.id),className:"flex items-start space-x-3 pb-4 mb-4 border-b-2 border-gray-700 last:border-b-0 group cursor-pointer",children:[(0,s.jsx)("span",{className:"flex items-center justify-center text-sm font-bold text-white border border-sky-600 rounded-full w-7 h-7 flex-shrink-0",children:t+1}),(0,s.jsx)("h3",{className:"text-sm font-semibold text-fundo-card group-hover:text-categoria-default transition-colors line-clamp-3",children:(0,l.getPostTitle)(e)})]},e.id))})]})})}let A=(0,c.default)("newspaper",[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]]);var E=e.i(78021);let I=(0,c.default)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]),U=(0,c.default)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]),_=(0,c.default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);function R(){return(0,s.jsx)("footer",{className:"bg-black text-white mt-16 border-t border-gray-800",children:(0,s.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-12",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-8",children:[(0,s.jsxs)("div",{className:"col-span-1 md:col-span-2",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-3 mb-4",children:[(0,s.jsx)(A,{className:"w-8 h-8 text-sky-600"}),(0,s.jsxs)("h2",{className:"text-2xl font-bold",children:["Primeira",(0,s.jsx)("span",{className:"text-sky-600",children:"News"})]})]}),(0,s.jsx)("p",{className:"text-gray-400 mb-6",children:"Seu portal de notícias confiável. Informação de qualidade, atualizada em tempo real para você estar sempre bem informado."}),(0,s.jsxs)("div",{className:"flex space-x-4 mb-6",children:[(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:(0,s.jsx)(h.Facebook,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:(0,s.jsx)(E.Twitter,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:(0,s.jsx)(x,{className:"w-6 h-6"})}),(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:(0,s.jsx)(u,{className:"w-6 h-6"})})]}),(0,s.jsxs)("div",{className:"space-y-2 text-sm text-gray-400",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)(I,{className:"w-4 h-4"}),(0,s.jsx)("span",{children:"contato@primeiranews.com"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)(U,{className:"w-4 h-4"}),(0,s.jsx)("span",{children:"(11) 9999-9999"})]}),(0,s.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,s.jsx)(_,{className:"w-4 h-4"}),(0,s.jsx)("span",{children:"São Paulo, SP"})]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-4",children:"Seções"}),(0,s.jsxs)("ul",{className:"space-y-2 text-gray-400",children:[(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Política"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Economia"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Esportes"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Entretenimento"})})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-4",children:"Institucional"}),(0,s.jsxs)("ul",{className:"space-y-2 text-gray-400",children:[(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Sobre Nós"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Contato"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Anuncie"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Política de Privacidade"})})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"text-lg font-semibold mb-4",children:"Informações"}),(0,s.jsxs)("ul",{className:"space-y-2 text-gray-400",children:[(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Redação 24h"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Certificação Digital"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Trabalhe Conosco"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-sky-600 transition-colors",children:"Seja um Colunista"})})]})]})]}),(0,s.jsx)("div",{className:"border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm",children:(0,s.jsx)("p",{children:"© 2025 PrimeiraNews. Todos os direitos reservados."})})]})})}let H=({items:e,onImageChange:a,summaries:r,onItemClick:i})=>{let[l,n]=(0,t.useState)(0),[d,c]=(0,t.useState)(!1),[x,h]=(0,t.useState)(!1),[u,m]=(0,t.useState)(0),[p,g]=(0,t.useState)(0),[b,f]=(0,t.useState)(!1),[v,j]=(0,t.useState)(0),[y,w]=(0,t.useState)(0),N=(0,t.useRef)(null),k=e||[{id:1,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/666dde4d-00d0-43ff-95c5-c31c56bbbbb5.jpg",title:"Ouro no Oceano",description:"Ondas dançando sob o pôr do sol dourado"},{id:2,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/1381b203-7845-467c-b145-44bbe0836b1f.jpg",title:"Majestade da Montanha",description:"Tocando as nuvens no topo do mundo"},{id:3,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/6b2e770e-b625-4027-9096-7d27a626fd76.jpg",title:"Floresta Mística",description:"Onde a mágica respira entre as árvores"},{id:4,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/2fe7ede0-8520-43b7-8d5b-5b058b3a624b.jpg",title:"Sonhos Aurora",description:"O espetáculo de luzes da natureza"},{id:5,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/e559c9df-c9a3-44f6-92cf-6999d928ef0b.jpg",title:"Sinfonia do Deserto",description:"Areias douradas que se estendem para sempre"},{id:6,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/a22da878-d4a4-41d8-ab24-6af771fd0612.jpg",title:"Paraíso Encontrado",description:"Onde os sonhos encontram a realidade"},{id:7,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/643006b8-6bbd-4599-9b81-32698fe9fdab.jpg",title:"Maravilha da Primavera",description:"Pétalas dançando ao vento"},{id:8,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/d8d088b4-5e28-4d75-b8fa-afebead9a04e.jpg",title:"Poder da Natureza",description:"Onde a água esculpe a pedra"}];(0,t.useEffect)(()=>{let e=setInterval(()=>{d||P()},3e3);return()=>clearInterval(e)},[l,d]),(0,t.useEffect)(()=>{let e=()=>{h(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,t.useEffect)(()=>{let e=e=>{switch(e.key){case"ArrowLeft":C();break;case"ArrowRight":P()}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]),(0,t.useEffect)(()=>{a&&a(l)},[l,a]);let P=()=>{d||(n((l+1)%k.length),c(!0),setTimeout(()=>c(!1),1200))},C=()=>{d||(n((l-1+k.length)%k.length),c(!0),setTimeout(()=>c(!1),1200))},M=e=>{d||e===l||(n(e),c(!0),setTimeout(()=>c(!1),1200))};return(0,s.jsxs)("div",{className:"w-full",style:{background:"linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)",borderRadius:"16px"},children:[(0,s.jsx)("style",{children:`
        .animate-border-glow {
          position: relative;
        }
        .animate-border-glow::before {
          content: '';
          position: absolute;
          inset: -2.5px;
          border-radius: 16px;
          background: linear-gradient(45deg, #7f1d1d, #ef4444);
          pointer-events: none;
          z-index: -1;
          animation: border-glow 3s ease-in-out infinite;
        }
        @keyframes border-glow {
          0%, 100% {
            box-shadow: 0 0 4px rgba(220, 38, 38, 0.4);
            opacity: 0.7;
          }
          50% {
            box-shadow: 0 0 24px 6px rgba(220, 38, 38, 0.8);
            opacity: 1;
          }
        }
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px 24px;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 8px;
          align-items: start;
        }
        .summary-panel {
          position: relative;
          background: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 24px;
          position: sticky;
          top: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .summary-panel h2 {
          font-size: 20px;
          font-weight: bold;
          color: white;
          margin-bottom: 16px;
        }
        .summary-content {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }
        .summary-content p {
          margin-bottom: 12px;
        }
        .summary-content .small-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
        .carousel-container {
          position: relative;
          width: 100%;
          height: 450px;
          perspective: 1200px;
          padding: 0 0 40px 0;
        }
        .carousel-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .carousel-item {
          position: absolute;
          width: 400px;
          cursor: grab;
        }
        .carousel-card {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: visible;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          background: white;
          isolation: isolate;
        }
        .carousel-image {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          border-radius: 16px;
          z-index: 2;
        }
        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
          transition: transform 0.3s ease;
        }
        .carousel-card:hover .carousel-image img {
          transform: scale(1.05);
        }
        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 6px 12px;
          color: white;
          font-size: 14px;
          font-weight: 500;
          z-index: 3;
        }
        .text-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          z-index: 3;
        }
        .text-background {
          position: absolute;
          inset-x: 0;
          bottom: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%);
        }
        .text-content {
          position: relative;
        }
        .text-title {
          font-size: 24px;
          font-weight: bold;
          color: white;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .text-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .nav-btn {
          color: white;
          background: transparent;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover {
          transform: scale(1.2);
        }
        .nav-btn svg {
          width: 28px;
          height: 28px;
        }
        .fixed-dots {
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 20;
        }
        .dots-wrapper {
          display: flex;
          gap: 10px;
        }
        .fixed-dot {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          padding: 0;
          width: 12px;
          height: 12px;
        }
        .fixed-dot.active {
          width: 36px;
          border-radius: 18px;
          background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
          box-shadow: 0 0 12px rgba(220, 38, 38, 0.6);
        }
        .fixed-dot:hover:not(.active) {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.3);
        }
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .summary-panel {
            position: static;
            order: 2;
          }
          .carousel-container {
            order: 1;
          }
        }
        @media (max-width: 768px) {
          .carousel-container {
            height: 500px;
          }
          .carousel-item {
            width: 300px;
          }
          .carousel-image {
            height: 300px;
          }
        }
      `}),(0,s.jsx)("div",{className:"main-content",children:(0,s.jsxs)("div",{className:"content-grid",children:[(0,s.jsx)("div",{className:"summary-panel",children:(0,s.jsxs)("div",{className:"summary-content",style:{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"300px"},children:[(0,s.jsx)("h2",{style:{fontSize:"28px",lineHeight:"1.3",marginBottom:"16px"},children:k[l]?.title}),(0,s.jsx)("p",{className:"small-text",style:{marginBottom:"16px"},children:(r||["Os mestres da corrupção que operam nos bastidores do poder, controlando políticas e recursos para benefício próprio.","Os articuladores políticos que vendem o país por pequenos favores pessoais, traindo a confiança do povo brasileiro.","Os empresários que lucram com a miséria alheia, explorando trabalhadores e sonegando impostos sem escrúpulos.","Os juízes e promotores que manipulam a justiça conforme seus interesses, protegendo aliados e perseguindo inimigos.","Os lobistas internacionais que ditam as regras da economia nacional, colocando o Brasil em posição de subserviência.","Os líderes partidários que priorizam seus cargos e salários em detrimento do bem-estar da população que deveriam servir.","Os banqueiros que controlam o fluxo de dinheiro no país, decidindo quem prospera e quem sofre com seus juros abusivos.","Os comunicadores que distorcem a verdade para manter a população alienada, servindo aos interesses dos poderosos."])[l]}),k[l]?.tags&&k[l].tags.length>0&&(0,s.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:k[l].tags.slice(0,3).map((e,t)=>(0,s.jsxs)("span",{style:{background:"linear-gradient(135deg, #3b82f6, #2563eb)",color:"white",padding:"4px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"600",boxShadow:"0 2px 8px rgba(59, 130, 246, 0.4)"},children:["#",e]},t))})]})}),(0,s.jsxs)("div",{ref:N,className:"carousel-container",onTouchStart:e=>{m(e.targetTouches[0].clientX)},onTouchMove:e=>{g(e.targetTouches[0].clientX)},onTouchEnd:()=>{if(!u||!p)return;let e=u-p;e>50&&P(),e<-50&&C(),m(0),g(0)},onMouseDown:e=>{f(!0),j(e.clientX)},onMouseMove:e=>{b&&w(e.clientX)},onMouseUp:()=>{if(!b)return;let e=v-y;e>50&&P(),e<-50&&C(),f(!1),j(0),w(0)},onMouseLeave:()=>{f(!1),j(0),w(0)},style:{cursor:b?"grabbing":"grab"},children:[(0,s.jsx)("div",{className:"carousel-wrapper",style:{perspective:"1200px"},children:k.map((e,t)=>(0,s.jsx)("div",{className:"carousel-item",style:(e=>{let s=(e-l+k.length)%k.length;if(0===s)return{transform:"translateZ(200px) scale(1)",filter:"none",opacity:1,zIndex:k.length,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"};if(!(s<=3))return{transform:"translateX(-500px) scale(0.8)",filter:"grayscale(100%)",opacity:0,zIndex:0,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"};{let e=k.length-s;return{transform:`translateX(${s*(x?40:60)}px) translateY(${30*s}px) scale(${1-.08*s})`,filter:"grayscale(100%)",opacity:1-.25*s,zIndex:e,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",cursor:"pointer"}}})(t),onClick:()=>{t===l&&i?i(e.id):t!==l&&M(t)},children:(0,s.jsx)("div",{className:"carousel-card animate-border-glow",children:(0,s.jsxs)("div",{className:"carousel-image",children:[(0,s.jsx)(o.default,{src:e.image,alt:e.title,ratio:"4/3",priority:t===l?"high":"normal",transitionDuration:"400ms"}),e.category&&(0,s.jsx)("div",{className:"absolute top-4 left-4 bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase z-20 rounded-full shadow-lg",children:e.category}),(0,s.jsxs)("div",{className:"badge",children:[t+1," / ",k.length]})]})})},e.id))}),(0,s.jsxs)("div",{className:"fixed-dots",children:[(0,s.jsx)("button",{className:"nav-btn",onClick:C,title:"Previous",children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{d:"M15 19l-7-7 7-7"})})}),(0,s.jsx)("div",{className:"dots-wrapper",children:k.map((e,t)=>(0,s.jsx)("button",{className:`fixed-dot ${t===l?"active":""}`,onClick:()=>M(t),title:`Go to slide ${t+1}`},t))}),(0,s.jsx)("button",{className:"nav-btn",onClick:P,title:"Next",children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,s.jsx)("path",{d:"M9 5l7 7-7 7"})})})]})]})]})})]})};var q=e.i(16409);let B=(0,r.default)(()=>e.A(94082),{loadableGenerated:{modules:[37102]},ssr:!1});function V({videos:e}){let[a,r]=(0,t.useState)(!1),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>{let e=i.current;if(!e)return;if(!window.IntersectionObserver)return void r(!0);let s=new IntersectionObserver(([e])=>{e.isIntersecting&&(r(!0),s.disconnect())},{rootMargin:"200px"});return s.observe(e),()=>s.disconnect()},[]),(0,s.jsx)("section",{className:"mt-12",ref:i,children:(0,s.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:(0,s.jsx)("div",{className:"lg:col-span-12",children:a?(0,s.jsx)(B,{videos:e}):(0,s.jsx)("div",{className:"h-64 bg-gray-100 rounded-xl animate-pulse"})})})})}function $(){let e=(0,a.useRouter)(),{data:r=[],isLoading:c,isSuccess:x}=(0,n.usePosts)(50),{data:h=[],isLoading:u,isSuccess:p}=(0,n.usePostsByCategory)("noticias",50),{data:g=[],isLoading:b}=(0,n.usePostsByCategory)("enganadores",3),{data:f=[],isLoading:v}=(0,n.usePostsByCategory)("opiniao",5),j=c||u||b||v;(0,t.useEffect)(()=>{if(x&&p&&!j){let e=h.length+r.length;e>0&&i.default.success(`${e} not\xedcias carregadas!`,{duration:2e3})}},[x,p,j,h.length,r.length]);let y=s=>{let t=r.find(e=>e.id===s)||h.find(e=>e.id===s);t?e.push((0,d.getPostUrl)(t)):e.push(`/post/${s}`)};if(j)return(0,s.jsx)("div",{className:"min-h-screen bg-white flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsx)("div",{className:"inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"}),(0,s.jsx)("p",{className:"mt-4 text-gray-900",children:"Carregando notícias..."})]})});let N=r.slice(0,5);r.slice(0,5),r.slice(5,15),r.slice(15,21);let k=f.length>0?f:r.slice(21,26);r.slice(26,30);let P=g.map((e,s)=>{let t=e._embedded?.["wp:term"]?.[1]?.map(e=>e.name)||[];return{id:e.id,image:(0,l.getPostImage)(e),title:(0,l.getPostTitle)(e),description:e.excerpt?.rendered?.replace(/<[^>]+>/g,"").substring(0,100)+"...",category:e.categories_names?.[0]||"Enganadores",tags:t}}),C=g.map(e=>e.excerpt?.rendered?.replace(/<[^>]+>/g,"").trim()||(0,l.getPostTitle)(e)),M=e=>(0,l.getPostImage)(e).replace(/^https?:\/\/[^\/]+/,"")||"/placeholder.jpg";return(0,s.jsxs)("div",{className:"min-h-screen relative overflow-hidden",children:[(0,s.jsx)("div",{className:"animated-bg absolute inset-0 -z-10"}),(0,s.jsx)(m,{}),(0,s.jsx)(w,{}),(0,s.jsxs)("main",{className:"max-w-7xl mx-auto px-4 py-4",children:[(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch",children:[(0,s.jsx)("div",{className:"lg:col-span-3",children:(0,s.jsx)(T,{posts:N,title:"Mais Lidas",onPostClick:y})}),(0,s.jsxs)("div",{className:"lg:col-span-6",children:[(0,s.jsxs)("div",{className:"relative mb-3",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"}),(0,s.jsx)("div",{className:"relative p-[2px] rounded-xl animated-border shadow-2xl",children:(0,s.jsxs)("div",{className:"relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-sky-500 blur-sm opacity-50"}),(0,s.jsx)("div",{className:"relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M13 10V3L4 14h7v7l9-11h-7z"})})})]}),(0,s.jsx)("h2",{className:"text-xl font-black text-white tracking-tight",children:"Principais Notícias"})]}),(0,s.jsx)("div",{className:"absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"})]})})]}),(0,s.jsx)(O,{posts:(h.length>0?h:r).slice(0,8),onPostClick:y})]}),(0,s.jsx)("div",{className:"lg:col-span-3",children:(0,s.jsx)(T,{posts:N,title:"Assuntos em Alta",onPostClick:y})})]}),(0,s.jsx)("section",{className:"mt-16",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,s.jsxs)("div",{className:"lg:col-span-9",children:[(0,s.jsxs)("div",{className:"relative mb-2",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"}),(0,s.jsx)("div",{className:"relative p-[2px] rounded-xl animated-border shadow-2xl",children:(0,s.jsxs)("div",{className:"relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3",children:[(0,s.jsxs)("div",{className:"flex items-center gap-3",children:[(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("div",{className:"absolute inset-0 bg-sky-500 blur-sm opacity-50"}),(0,s.jsx)("div",{className:"relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center",children:(0,s.jsx)("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M5 3l14 9-14 9V3z"})})})]}),(0,s.jsx)("h2",{className:"text-xl font-black text-white tracking-tight",children:"Notícias em Destaque"})]}),(0,s.jsx)("div",{className:"absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"})]})})]}),(0,s.jsx)(H,{items:P,summaries:C,onItemClick:y})]}),(0,s.jsx)("div",{className:"lg:col-span-3",children:(0,s.jsx)(q.default,{})})]})}),(0,s.jsx)("section",{className:"mt-16 relative bg-slate-50 border border-slate-200 rounded-2xl",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6",children:[(0,s.jsx)("div",{className:"lg:col-span-4",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,s.jsx)("div",{className:"bg-blue-600 px-4 py-3 border-b border-blue-700",children:(0,s.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Últimas Notícias"]})}),(0,s.jsx)("div",{children:r.slice(0,5).map((e,t)=>(0,s.jsxs)("div",{onClick:()=>y(e.id),className:"flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0",children:[(0,s.jsx)("div",{className:"flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden",children:(0,s.jsx)(o.default,{src:M(e),alt:(0,l.getPostTitle)(e),ratio:"4/3",className:"group-hover:scale-105 transition-transform duration-300"})}),(0,s.jsx)("div",{className:"flex-1 min-w-0 flex items-center",children:(0,s.jsx)("h3",{className:"text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug",children:(0,l.getPostTitle)(e)})})]},e.id))})]})}),(0,s.jsx)("div",{className:"lg:col-span-5",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,s.jsx)("div",{className:"bg-slate-900 px-4 py-3 border-b border-slate-700",children:(0,s.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})}),"Judiciário"]})}),(0,s.jsx)("div",{children:r.slice(10,15).map((e,t)=>(0,s.jsxs)("div",{onClick:()=>y(e.id),className:"flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0",children:[(0,s.jsx)("div",{className:"flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden",children:(0,s.jsx)(o.default,{src:M(e),alt:(0,l.getPostTitle)(e),ratio:"4/3",className:"group-hover:scale-105 transition-transform duration-300"})}),(0,s.jsx)("div",{className:"flex-1 min-w-0 flex items-center",children:(0,s.jsx)("h3",{className:"text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-snug",children:(0,l.getPostTitle)(e)})})]},e.id))})]})}),(0,s.jsx)("div",{className:"lg:col-span-3",children:(0,s.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,s.jsx)("div",{className:"bg-red-600 px-4 py-3 border-b border-red-800",children:(0,s.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"})}),"Nossa Opinião"]})}),(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsx)("span",{className:"inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-700 mb-3",children:"Opinião da Redação"}),k.map((e,t)=>(0,s.jsxs)("div",{onClick:()=>y(e.id),className:"flex items-start gap-3 py-3 px-2 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0 rounded-lg",children:[(0,s.jsx)("span",{className:"flex items-center justify-center text-lg font-bold text-red-600 border-2 border-red-400 rounded-full w-8 h-8 flex-shrink-0",children:t+1}),(0,s.jsx)("h4",{className:"text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3",children:e.title.rendered.replace(/<[^>]*>/g,"")})]},e.id))]})]})})]})}),(0,s.jsx)(V,{videos:[{id:1,title:"Últimas notícias sobre política nacional",thumbnail:"/assets/videos/video-1.png",videoUrl:"#video1",views:12500,duration:"5:23"},{id:2,title:"Entrevista exclusiva com especialista em economia",thumbnail:"/assets/videos/video-2.png",videoUrl:"#video2",views:8900,duration:"7:45"},{id:3,title:"Cobertura completa do evento esportivo",thumbnail:"/assets/videos/video-3.png",videoUrl:"#video3",views:15600,duration:"4:12"},{id:4,title:"Análise do mercado internacional",thumbnail:"/assets/videos/video-4.png",videoUrl:"#video4",views:7200,duration:"6:30"},{id:5,title:"Reportagem especial sobre meio ambiente",thumbnail:"/assets/videos/video-5.png",videoUrl:"#video5",views:9800,duration:"8:15"},{id:6,title:"Novidades tecnológicas da semana",thumbnail:"/assets/videos/video-6.png",videoUrl:"#video6",views:11200,duration:"3:47"},{id:7,title:"Cultura e entretenimento em destaque",thumbnail:"/assets/videos/video-7.png",videoUrl:"#video7",views:8300,duration:"5:55"},{id:8,title:"Saúde e bem-estar: dicas importantes",thumbnail:"/assets/videos/video-8.png",videoUrl:"#video8",views:14500,duration:"4:40"},{id:9,title:"Educação: tendências e inovações",thumbnail:"/assets/videos/video-9.png",videoUrl:"#video9",views:6700,duration:"7:20"},{id:10,title:"Turismo: destinos imperdíveis",thumbnail:"/assets/videos/video-10.png",videoUrl:"#video10",views:12300,duration:"6:05"}]})]}),(0,s.jsx)(R,{})]})}e.s(["default",()=>$],31713)}]);