(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,67585,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"BailoutToCSR",{enumerable:!0,get:function(){return i}});let r=e.r(32061);function i({reason:e,children:t}){if("undefined"==typeof window)throw Object.defineProperty(new r.BailoutToCSRError(e),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return t}},9885,(e,t,s)=>{"use strict";function r(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"encodeURIPath",{enumerable:!0,get:function(){return r}})},52157,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"PreloadChunks",{enumerable:!0,get:function(){return n}});let r=e.r(43476),i=e.r(74080),a=e.r(63599),o=e.r(9885);function n({moduleIds:e}){if("undefined"!=typeof window)return null;let t=a.workAsyncStorage.getStore();if(void 0===t)return null;let s=[];if(t.reactLoadableManifest&&e){let r=t.reactLoadableManifest;for(let t of e){if(!r[t])continue;let e=r[t].files;s.push(...e)}}return 0===s.length?null:(0,r.jsx)(r.Fragment,{children:s.map(e=>{let s=`${t.assetPrefix}/_next/${(0,o.encodeURIPath)(e)}`;return e.endsWith(".css")?(0,r.jsx)("link",{precedence:"dynamic",href:s,rel:"stylesheet",as:"style",nonce:t.nonce},e):((0,i.preload)(s,{as:"script",fetchPriority:"low",nonce:t.nonce}),null)})})}},69093,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return d}});let r=e.r(43476),i=e.r(71645),a=e.r(67585),o=e.r(52157);function n(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(n(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},s=(0,i.lazy)(()=>t.loader().then(n)),d=t.loading;function c(e){let n=d?(0,r.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!t.ssr||!!t.loading,c=l?i.Suspense:i.Fragment,u=t.ssr?(0,r.jsxs)(r.Fragment,{children:["undefined"==typeof window?(0,r.jsx)(o.PreloadChunks,{moduleIds:t.modules}):null,(0,r.jsx)(s,{...e})]}):(0,r.jsx)(a.BailoutToCSR,{reason:"next/dynamic",children:(0,r.jsx)(s,{...e})});return(0,r.jsx)(c,{...l?{fallback:n}:{},children:u})}return c.displayName="LoadableComponent",c}},70703,(e,t,s)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),Object.defineProperty(s,"default",{enumerable:!0,get:function(){return i}});let r=e.r(55682)._(e.r(69093));function i(e,t){let s={};"function"==typeof e&&(s.loader=e);let i={...s,...t};return(0,r.default)({...i,modules:i.loadableGenerated?.modules})}("function"==typeof s.default||"object"==typeof s.default&&null!==s.default)&&void 0===s.default.__esModule&&(Object.defineProperty(s.default,"__esModule",{value:!0}),Object.assign(s.default,s),t.exports=s.default)},31713,e=>{"use strict";var t=e.i(43476),s=e.i(71645),r=e.i(18566),i=e.i(70703),a=e.i(5766),o=e.i(45646),n=e.i(59228),l=e.i(82693),d=e.i(2971),c=e.i(88589),u=e.i(80401);e.i(41983);var p=e.i(72225),m=e.i(86301),x=e.i(79053),g=e.i(15208),g=g,h=e.i(82580),h=h,b=e.i(73712),b=b;function f({posts:e,onPostClick:r}){let[i,a]=(0,s.useState)(!1),[l,d]=(0,s.useState)(null),[c,f]=(0,s.useState)(null),[v,j]=(0,s.useState)(0);return((0,s.useEffect)(()=>{j(0)},[e]),(0,s.useEffect)(()=>{a(!0)},[e]),i&&0!==e.length)?(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("style",{children:`
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
      `}),(0,t.jsx)("div",{className:"rounded-lg overflow-hidden transition-all duration-300 carousel-animated-border",children:(0,t.jsx)(u.Swiper,{modules:[p.Autoplay,m.Pagination,x.Navigation,g.default,h.default],onSwiper:f,effect:"fade",fadeEffect:{crossFade:!0},spaceBetween:0,slidesPerView:1,autoplay:{delay:8e3,disableOnInteraction:!1},pagination:{clickable:!0,el:".news-carousel-pagination"},navigation:!0,loop:!1,watchOverflow:!0,thumbs:l?{swiper:l}:void 0,onSlideChange:e=>j(e.activeIndex),className:"h-[420px]",children:e.map(e=>(0,t.jsx)(u.SwiperSlide,{children:(0,t.jsx)("div",{onClick:()=>r?.(e.id),className:"block h-full cursor-pointer carousel-slide-hover",children:(0,t.jsxs)("div",{className:"relative h-full w-full group cursor-pointer overflow-hidden",children:[(0,t.jsx)(o.default,{src:(0,n.getPostImage)(e).replace(/^https?:\/\/[^\/]+/,"")||"/placeholder.jpg",alt:(0,n.getPostTitle)(e),ratio:"16/9",priority:"high",usePicture:!0,style:{filter:"brightness(120%)"}}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"}),(e.categories_names&&e.categories_names.length>0||e.categories&&e.categories.length>0)&&(0,t.jsx)("div",{className:"absolute top-4 left-4 bg-sky-700 text-white px-2.5 py-1 text-xs font-semibold uppercase z-20",children:e.categories_names?e.categories_names.find(e=>"notícias"!==e.toLowerCase()&&"noticias"!==e.toLowerCase())||e.categories_names[0]:`Cat ${e.categories?.filter(e=>1!==e)[0]||e.categories?.[0]||""}`}),(0,t.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 p-6",children:[(0,t.jsx)("div",{className:"absolute inset-x-0 inset-y-4 bg-black/40 backdrop-blur-sm"}),(0,t.jsx)("h2",{className:"relative z-10 text-white text-2xl font-bold leading-tight line-clamp-2 group-hover:text-fundo-card transition-colors duration-300",style:{textShadow:"2px 2px 4px rgba(0, 0, 0, 0.9)"},children:(0,n.getPostTitle)(e)})]})]})})},e.id))})}),(0,t.jsx)("div",{className:"mt-3",children:(0,t.jsx)(u.Swiper,{modules:[b.default,h.default],onSwiper:d,spaceBetween:8,slidesPerView:Math.min(6,Math.max(1,e.length)),freeMode:!0,watchSlidesProgress:!0,watchOverflow:!0,className:"thumbs-swiper",children:e.map((e,s)=>(0,t.jsx)(u.SwiperSlide,{children:(0,t.jsx)("div",{className:"h-16 w-full overflow-hidden rounded-md transition-all duration-300 group hover:scale-105 hover:z-10 cursor-pointer",onClick:()=>{c&&c.slideToLoop(s,300)},children:(0,t.jsx)("div",{className:`h-full w-full overflow-hidden rounded-md border-[3px] transition-all duration-300 ${v===s?"border-blue-300 shadow-lg":"border-white/20"} group-hover:border-blue-200 group-hover:shadow-xl`,style:{backgroundImage:`url(${(0,n.getPostImage)(e)})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",opacity:v===s?1:.6,transition:"all 300ms"},onMouseEnter:e=>e.currentTarget.style.opacity="1",onMouseLeave:e=>e.currentTarget.style.opacity=v===s?"1":"0.6"})})},`thumb-${e.id}`))})}),(0,t.jsx)("div",{className:"news-carousel-pagination flex justify-center mt-4 gap-2"})]}):(console.log(`[DEBUG] NewsCarousel posts length: ${e.length}`),(0,t.jsx)("div",{className:"bg-fundo-destaque rounded-lg h-[320px] animate-pulse flex items-center justify-center shadow-card",children:(0,t.jsx)("p",{className:"text-texto-terciario",children:"Carregando notícias..."})}))}var v=e.i(25652);function j({posts:e,title:s,onPostClick:r}){return(0,t.jsx)("aside",{className:"h-full",children:(0,t.jsxs)("div",{className:"bg-texto-principal rounded-lg shadow-card p-4 h-full border-2 border-gray-700",children:[(0,t.jsxs)("div",{className:"flex items-center space-x-2 mb-4",children:[(0,t.jsx)(v.TrendingUp,{className:"w-5 h-5 text-categoria-default"}),(0,t.jsx)("h2",{className:"text-xl font-bold text-fundo-card",children:s})]}),(0,t.jsx)("div",{className:"space-y-4",children:e.map((e,s)=>(0,t.jsxs)("div",{onClick:()=>r?.(e.id),className:"flex items-start space-x-3 pb-4 mb-4 border-b-2 border-gray-700 last:border-b-0 group cursor-pointer",children:[(0,t.jsx)("span",{className:"flex items-center justify-center text-sm font-bold text-white border border-sky-600 rounded-full w-7 h-7 flex-shrink-0",children:s+1}),(0,t.jsx)("h3",{className:"text-sm font-semibold text-fundo-card group-hover:text-categoria-default transition-colors line-clamp-3",children:(0,n.getPostTitle)(e)})]},e.id))})]})})}var w=e.i(13642);let y=({items:e,onImageChange:r,summaries:i,onItemClick:a})=>{let[n,l]=(0,s.useState)(0),[d,c]=(0,s.useState)(!1),[u,p]=(0,s.useState)(!1),[m,x]=(0,s.useState)(0),[g,h]=(0,s.useState)(0),[b,f]=(0,s.useState)(!1),[v,j]=(0,s.useState)(0),[w,y]=(0,s.useState)(0),N=(0,s.useRef)(null),k=e||[{id:1,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/666dde4d-00d0-43ff-95c5-c31c56bbbbb5.jpg",title:"Ouro no Oceano",description:"Ondas dançando sob o pôr do sol dourado"},{id:2,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/1381b203-7845-467c-b145-44bbe0836b1f.jpg",title:"Majestade da Montanha",description:"Tocando as nuvens no topo do mundo"},{id:3,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/6b2e770e-b625-4027-9096-7d27a626fd76.jpg",title:"Floresta Mística",description:"Onde a mágica respira entre as árvores"},{id:4,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/2fe7ede0-8520-43b7-8d5b-5b058b3a624b.jpg",title:"Sonhos Aurora",description:"O espetáculo de luzes da natureza"},{id:5,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/e559c9df-c9a3-44f6-92cf-6999d928ef0b.jpg",title:"Sinfonia do Deserto",description:"Areias douradas que se estendem para sempre"},{id:6,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/a22da878-d4a4-41d8-ab24-6af771fd0612.jpg",title:"Paraíso Encontrado",description:"Onde os sonhos encontram a realidade"},{id:7,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/643006b8-6bbd-4599-9b81-32698fe9fdab.jpg",title:"Maravilha da Primavera",description:"Pétalas dançando ao vento"},{id:8,image:"https://pub-cdn.sider.ai/u/U0L5HA67V90/web-coder/690e7b8161d18d6576212620/resource/d8d088b4-5e28-4d75-b8fa-afebead9a04e.jpg",title:"Poder da Natureza",description:"Onde a água esculpe a pedra"}];(0,s.useEffect)(()=>{let e=setInterval(()=>{d||P()},3e3);return()=>clearInterval(e)},[n,d]),(0,s.useEffect)(()=>{let e=()=>{p(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,s.useEffect)(()=>{let e=e=>{switch(e.key){case"ArrowLeft":C();break;case"ArrowRight":P()}};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[]),(0,s.useEffect)(()=>{r&&r(n)},[n,r]);let P=()=>{d||(l((n+1)%k.length),c(!0),setTimeout(()=>c(!1),1200))},C=()=>{d||(l((n-1+k.length)%k.length),c(!0),setTimeout(()=>c(!1),1200))},S=e=>{d||e===n||(l(e),c(!0),setTimeout(()=>c(!1),1200))};return(0,t.jsxs)("div",{className:"w-full",style:{background:"linear-gradient(135deg, #111827 0%, #000000 50%, #111827 100%)",borderRadius:"16px"},children:[(0,t.jsx)("style",{children:`
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
      `}),(0,t.jsx)("div",{className:"main-content",children:(0,t.jsxs)("div",{className:"content-grid",children:[(0,t.jsx)("div",{className:"summary-panel",children:(0,t.jsxs)("div",{className:"summary-content",style:{display:"flex",flexDirection:"column",justifyContent:"center",minHeight:"300px"},children:[(0,t.jsx)("h2",{style:{fontSize:"28px",lineHeight:"1.3",marginBottom:"16px"},children:k[n]?.title}),(0,t.jsx)("p",{className:"small-text",style:{marginBottom:"16px"},children:(i||["Os mestres da corrupção que operam nos bastidores do poder, controlando políticas e recursos para benefício próprio.","Os articuladores políticos que vendem o país por pequenos favores pessoais, traindo a confiança do povo brasileiro.","Os empresários que lucram com a miséria alheia, explorando trabalhadores e sonegando impostos sem escrúpulos.","Os juízes e promotores que manipulam a justiça conforme seus interesses, protegendo aliados e perseguindo inimigos.","Os lobistas internacionais que ditam as regras da economia nacional, colocando o Brasil em posição de subserviência.","Os líderes partidários que priorizam seus cargos e salários em detrimento do bem-estar da população que deveriam servir.","Os banqueiros que controlam o fluxo de dinheiro no país, decidindo quem prospera e quem sofre com seus juros abusivos.","Os comunicadores que distorcem a verdade para manter a população alienada, servindo aos interesses dos poderosos."])[n]}),k[n]?.tags&&k[n].tags.length>0&&(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:k[n].tags.slice(0,3).map((e,s)=>(0,t.jsxs)("span",{style:{background:"linear-gradient(135deg, #3b82f6, #2563eb)",color:"white",padding:"4px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"600",boxShadow:"0 2px 8px rgba(59, 130, 246, 0.4)"},children:["#",e]},s))})]})}),(0,t.jsxs)("div",{ref:N,className:"carousel-container",onTouchStart:e=>{x(e.targetTouches[0].clientX)},onTouchMove:e=>{h(e.targetTouches[0].clientX)},onTouchEnd:()=>{if(!m||!g)return;let e=m-g;e>50&&P(),e<-50&&C(),x(0),h(0)},onMouseDown:e=>{f(!0),j(e.clientX)},onMouseMove:e=>{b&&y(e.clientX)},onMouseUp:()=>{if(!b)return;let e=v-w;e>50&&P(),e<-50&&C(),f(!1),j(0),y(0)},onMouseLeave:()=>{f(!1),j(0),y(0)},style:{cursor:b?"grabbing":"grab"},children:[(0,t.jsx)("div",{className:"carousel-wrapper",style:{perspective:"1200px"},children:k.map((e,s)=>(0,t.jsx)("div",{className:"carousel-item",style:(e=>{let t=(e-n+k.length)%k.length;if(0===t)return{transform:"translateZ(200px) scale(1)",filter:"none",opacity:1,zIndex:k.length,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"};if(!(t<=3))return{transform:"translateX(-500px) scale(0.8)",filter:"grayscale(100%)",opacity:0,zIndex:0,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)"};{let e=k.length-t;return{transform:`translateX(${t*(u?40:60)}px) translateY(${30*t}px) scale(${1-.08*t})`,filter:"grayscale(100%)",opacity:1-.25*t,zIndex:e,transition:"all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",cursor:"pointer"}}})(s),onClick:()=>{s===n&&a?a(e.id):s!==n&&S(s)},children:(0,t.jsx)("div",{className:"carousel-card animate-border-glow",children:(0,t.jsxs)("div",{className:"carousel-image",children:[(0,t.jsx)(o.default,{src:e.image,alt:e.title,ratio:"4/3",priority:s===n?"high":"normal",transitionDuration:"400ms"}),e.category&&(0,t.jsx)("div",{className:"absolute top-4 left-4 bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase z-20 rounded-full shadow-lg",children:e.category}),(0,t.jsxs)("div",{className:"badge",children:[s+1," / ",k.length]})]})})},e.id))}),(0,t.jsxs)("div",{className:"fixed-dots",children:[(0,t.jsx)("button",{className:"nav-btn",onClick:C,title:"Previous",children:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,t.jsx)("path",{d:"M15 19l-7-7 7-7"})})}),(0,t.jsx)("div",{className:"dots-wrapper",children:k.map((e,s)=>(0,t.jsx)("button",{className:`fixed-dot ${s===n?"active":""}`,onClick:()=>S(s),title:`Go to slide ${s+1}`},s))}),(0,t.jsx)("button",{className:"nav-btn",onClick:P,title:"Next",children:(0,t.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,t.jsx)("path",{d:"M9 5l7 7-7 7"})})})]})]})]})})]})};var N=e.i(16409);let k=(0,i.default)(()=>e.A(94082),{loadableGenerated:{modules:[37102]},ssr:!1});function P({videos:e}){let[r,i]=(0,s.useState)(!1),a=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=a.current;if(!e)return;if(!window.IntersectionObserver)return void i(!0);let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(i(!0),t.disconnect())},{rootMargin:"200px"});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)("section",{className:"mt-12",ref:a,children:(0,t.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:(0,t.jsx)("div",{className:"lg:col-span-12",children:r?(0,t.jsx)(k,{videos:e}):(0,t.jsx)("div",{className:"h-64 bg-gray-100 rounded-xl animate-pulse"})})})})}function C(){let e=(0,r.useRouter)(),{data:i=[],isLoading:u,isSuccess:p}=(0,l.usePosts)(50),{data:m=[],isLoading:x,isSuccess:g}=(0,l.usePostsByCategory)("noticias",50),{data:h=[],isLoading:b}=(0,l.usePostsByCategory)("enganadores",3),v=u||x||b;(0,s.useEffect)(()=>{if(p&&g&&!v){let e=m.length+i.length;e>0&&a.default.success(`${e} not\xedcias carregadas!`,{duration:2e3})}},[p,g,v,m.length,i.length]);let k=t=>{let s=i.find(e=>e.id===t)||m.find(e=>e.id===t);s?e.push(function(e){if("link"in e&&e.link){let t,s=(t=e.link.match(/\/(\d{4})\/(\d{2})\/([^\/]+)\/([^\/]+)\/?$/))?{year:t[1],month:t[2],category:t[3],postname:t[4]}:null;if(s)return`/${s.year}/${s.month}/${s.category}/${s.postname}`}return e.slug?`/${e.slug}`:`/post/${e.id}`}(s)):e.push(`/post/${t}`)};if(v)return(0,t.jsx)("div",{className:"min-h-screen bg-white flex items-center justify-center",children:(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("div",{className:"inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"}),(0,t.jsx)("p",{className:"mt-4 text-gray-900",children:"Carregando notícias..."})]})});let C=i.slice(0,5);i.slice(0,5),i.slice(5,15),i.slice(15,21);let S=i.slice(21,26);i.slice(26,30);let O=h.map((e,t)=>{let s=e._embedded?.["wp:term"]?.[1]?.map(e=>e.name)||[];return{id:e.id,image:(0,n.getPostImage)(e),title:(0,n.getPostTitle)(e),description:e.excerpt?.rendered?.replace(/<[^>]+>/g,"").substring(0,100)+"...",category:e.categories_names?.[0]||"Enganadores",tags:s}}),L=h.map(e=>e.excerpt?.rendered?.replace(/<[^>]+>/g,"").trim()||(0,n.getPostTitle)(e)),M=e=>(0,n.getPostImage)(e).replace(/^https?:\/\/[^\/]+/,"")||"/placeholder.jpg";return(0,t.jsxs)("div",{className:"min-h-screen relative overflow-hidden",children:[(0,t.jsx)("div",{className:"animated-bg absolute inset-0 -z-10"}),(0,t.jsx)(d.default,{}),(0,t.jsx)(c.default,{}),(0,t.jsxs)("main",{className:"max-w-7xl mx-auto px-4 py-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch",children:[(0,t.jsx)("div",{className:"lg:col-span-3",children:(0,t.jsx)(j,{posts:C,title:"Mais Lidas",onPostClick:k})}),(0,t.jsxs)("div",{className:"lg:col-span-6",children:[(0,t.jsxs)("div",{className:"relative mb-3",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"}),(0,t.jsx)("div",{className:"relative p-[2px] rounded-xl animated-border shadow-2xl",children:(0,t.jsxs)("div",{className:"relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-sky-500 blur-sm opacity-50"}),(0,t.jsx)("div",{className:"relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center",children:(0,t.jsx)("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M13 10V3L4 14h7v7l9-11h-7z"})})})]}),(0,t.jsx)("h2",{className:"text-xl font-black text-white tracking-tight",children:"Principais Notícias"})]}),(0,t.jsx)("div",{className:"absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"})]})})]}),(0,t.jsx)(f,{posts:(m.length>0?m:i).slice(0,8),onPostClick:k})]}),(0,t.jsx)("div",{className:"lg:col-span-3",children:(0,t.jsx)(j,{posts:C,title:"Assuntos em Alta",onPostClick:k})})]}),(0,t.jsx)("section",{className:"mt-16",children:(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,t.jsxs)("div",{className:"lg:col-span-9",children:[(0,t.jsxs)("div",{className:"relative mb-2",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600 opacity-10 blur-xl"}),(0,t.jsx)("div",{className:"relative p-[2px] rounded-xl animated-border shadow-2xl",children:(0,t.jsxs)("div",{className:"relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl px-4 py-3",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)("div",{className:"absolute inset-0 bg-sky-500 blur-sm opacity-50"}),(0,t.jsx)("div",{className:"relative w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center",children:(0,t.jsx)("svg",{className:"w-5 h-5 text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2.5,d:"M5 3l14 9-14 9V3z"})})})]}),(0,t.jsx)("h2",{className:"text-xl font-black text-white tracking-tight",children:"Notícias em Destaque"})]}),(0,t.jsx)("div",{className:"absolute -bottom-0.5 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent"})]})})]}),(0,t.jsx)(y,{items:O,summaries:L,onItemClick:k})]}),(0,t.jsx)("div",{className:"lg:col-span-3",children:(0,t.jsx)(N.default,{})})]})}),(0,t.jsx)("section",{className:"mt-16 relative bg-slate-50 border border-slate-200 rounded-2xl",children:(0,t.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-6",children:[(0,t.jsx)("div",{className:"lg:col-span-4",children:(0,t.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,t.jsx)("div",{className:"bg-blue-600 px-4 py-3 border-b border-blue-700",children:(0,t.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),"Últimas Notícias"]})}),(0,t.jsx)("div",{children:i.slice(0,5).map((e,s)=>(0,t.jsxs)("div",{onClick:()=>k(e.id),className:"flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0",children:[(0,t.jsx)("div",{className:"flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden",children:(0,t.jsx)(o.default,{src:M(e),alt:(0,n.getPostTitle)(e),ratio:"4/3",className:"group-hover:scale-105 transition-transform duration-300"})}),(0,t.jsx)("div",{className:"flex-1 min-w-0 flex items-center",children:(0,t.jsx)("h3",{className:"text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug",children:(0,n.getPostTitle)(e)})})]},e.id))})]})}),(0,t.jsx)("div",{className:"lg:col-span-5",children:(0,t.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,t.jsx)("div",{className:"bg-slate-900 px-4 py-3 border-b border-slate-700",children:(0,t.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"})}),"Judiciário"]})}),(0,t.jsx)("div",{children:i.slice(10,15).map((e,s)=>(0,t.jsxs)("div",{onClick:()=>k(e.id),className:"flex items-center gap-4 p-3 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0",children:[(0,t.jsx)("div",{className:"flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden",children:(0,t.jsx)(o.default,{src:M(e),alt:(0,n.getPostTitle)(e),ratio:"4/3",className:"group-hover:scale-105 transition-transform duration-300"})}),(0,t.jsx)("div",{className:"flex-1 min-w-0 flex items-center",children:(0,t.jsx)("h3",{className:"text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-snug",children:(0,n.getPostTitle)(e)})})]},e.id))})]})}),(0,t.jsx)("div",{className:"lg:col-span-3",children:(0,t.jsxs)("div",{className:"bg-white rounded-xl overflow-hidden h-full border border-slate-200 shadow-sm",children:[(0,t.jsx)("div",{className:"bg-red-600 px-4 py-3 border-b border-red-800",children:(0,t.jsxs)("h2",{className:"text-xs font-semibold tracking-wide text-white flex items-center gap-2 uppercase",children:[(0,t.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"})}),"Nossa Opinião"]})}),(0,t.jsxs)("div",{className:"p-4",children:[(0,t.jsx)("span",{className:"inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-700 mb-3",children:"Opinião da Redação"}),S.map((e,s)=>(0,t.jsxs)("div",{onClick:()=>k(e.id),className:"flex items-start gap-3 py-3 px-2 hover:bg-slate-50 transition-colors duration-200 cursor-pointer group border-b border-slate-200 last:border-b-0 rounded-lg",children:[(0,t.jsx)("span",{className:"flex items-center justify-center text-lg font-bold text-red-600 border-2 border-red-400 rounded-full w-8 h-8 flex-shrink-0",children:s+1}),(0,t.jsx)("h4",{className:"text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3",children:e.title.rendered.replace(/<[^>]*>/g,"")})]},e.id))]})]})})]})}),(0,t.jsx)(P,{videos:[{id:1,title:"Últimas notícias sobre política nacional",thumbnail:"/assets/videos/video-1.png",videoUrl:"#video1",views:12500,duration:"5:23"},{id:2,title:"Entrevista exclusiva com especialista em economia",thumbnail:"/assets/videos/video-2.png",videoUrl:"#video2",views:8900,duration:"7:45"},{id:3,title:"Cobertura completa do evento esportivo",thumbnail:"/assets/videos/video-3.png",videoUrl:"#video3",views:15600,duration:"4:12"},{id:4,title:"Análise do mercado internacional",thumbnail:"/assets/videos/video-4.png",videoUrl:"#video4",views:7200,duration:"6:30"},{id:5,title:"Reportagem especial sobre meio ambiente",thumbnail:"/assets/videos/video-5.png",videoUrl:"#video5",views:9800,duration:"8:15"},{id:6,title:"Novidades tecnológicas da semana",thumbnail:"/assets/videos/video-6.png",videoUrl:"#video6",views:11200,duration:"3:47"},{id:7,title:"Cultura e entretenimento em destaque",thumbnail:"/assets/videos/video-7.png",videoUrl:"#video7",views:8300,duration:"5:55"},{id:8,title:"Saúde e bem-estar: dicas importantes",thumbnail:"/assets/videos/video-8.png",videoUrl:"#video8",views:14500,duration:"4:40"},{id:9,title:"Educação: tendências e inovações",thumbnail:"/assets/videos/video-9.png",videoUrl:"#video9",views:6700,duration:"7:20"},{id:10,title:"Turismo: destinos imperdíveis",thumbnail:"/assets/videos/video-10.png",videoUrl:"#video10",views:12300,duration:"6:05"}]})]}),(0,t.jsx)(w.default,{})]})}e.s(["default",()=>C],31713)}]);